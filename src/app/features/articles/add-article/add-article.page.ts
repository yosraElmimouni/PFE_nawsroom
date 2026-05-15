import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AiAssistantPage } from '../../ai-assistant/ai-assistant.page';
import { Article } from 'src/app/core/models/article.model';
import { ArticleStatus, MediaType } from 'src/app/core/models/article.enums';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { ArticleService } from '../services/article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
  standalone: false,
})
export class AddArticlePage implements OnInit {
  article: any = {
    title: '',
    description: '',
    tags: [],
    status: 'Brouillon',
  };
  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];
  videoUrl: string = '';
  stream!: MediaStream;
  isRecordingVideo = false;
  isRecording = false;
  categories: string[] = [
    'Politique',
    'Économie',
    'Société',
    'International',
    'Sport',
    'Tech',
  ];

  selectedCategory: string | null = null;
  isAddingCategory = false;
  newCate = '';

  isEditMode = false;
  isAddingTag = false;
  newTag = '';
  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.articleService.getArticleById(Number(id)).subscribe({
        next: (data) => {
          this.article = data;
          this.selectedCategory = this.article.categorie;

          console.log(this.article);
        },

        error: (err) => {
          console.log(err);
        },
      });
      this.selectedCategory = this.article.categorie;
    }
  }

  async saveDraft() {
    this.article.status = ArticleStatus.Brouillon;

    this.articleService.updateArticle(this.article.id, this.article).subscribe({
      next: async (response) => {
        const toast = await this.toastCtrl.create({
          message: 'Brouillon enregistré',
          duration: 2000,
          color: 'warning',
        });

        await toast.present();

        console.log(response);
      },

      error: async (error) => {
        console.log(error);

        const toast = await this.toastCtrl.create({
          message: 'Erreur serveur',
          duration: 2000,
          color: 'danger',
        });

        await toast.present();
      },
    });
  }

  async addArticle() {
    this.article.status = ArticleStatus.Brouillon;

    console.log(this.article);
    this.articleService.createArticle(this.article).subscribe({
      next: async (response) => {
        console.log(response);

        const toast = await this.toastCtrl.create({
          message: 'Article ajouté avec succès',
          duration: 2000,
          color: 'success',
        });

        await toast.present();
      },

      error: async (error) => {
        console.log(error);

        const toast = await this.toastCtrl.create({
          message: 'Erreur lors de la création',
          duration: 2000,
          color: 'danger',
        });

        await toast.present();
      },
    });
  }

  // Publication de l'article
  async publishArticle() {
    const toast = await this.toastCtrl.create({
      message: ' Article publié avec succès !',
      duration: 2500,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  // Ajout de média
  async addMedia() {
    const toast = await this.toastCtrl.create({
      message: ' Fonctionnalité de capture à connecter',
      duration: 2000,
      color: 'primary',
      position: 'bottom',
    });
    await toast.present();
  }

  // Actions IA
  async aiImprove() {
    const toast = await this.toastCtrl.create({
      message: ' IA : Amélioration du texte en cours...',
      duration: 2000,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  startAddingTag() {
    this.isAddingTag = true;
  }

  addTag() {
    const tag = this.newTag.trim();

    if (tag) {
      this.article.tags = [...(this.article.tags || []), tag];
    }

    this.newTag = '';
    this.isAddingTag = false;
  }
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.article.categorie = category;
  }

  startAddingCategory() {
    this.isAddingCategory = true;
    this.newCate = '';
  }
  addCategory() {
    const category = this.newCate.trim();

    if (!category) {
      this.isAddingCategory = false;
      return;
    }

    // éviter les doublons
    if (!this.categories.includes(category)) {
      this.categories.push(category);
    }

    this.selectedCategory = category;
    this.article.categorie = category;

    this.newCate = '';
    this.isAddingCategory = false;
  }

  onCategoryChange(value: string) {
    if (value === '__add__') {
      this.startAddingCategory();
    }
  }

  async openAiAssistant() {
    const modal = await this.modalCtrl.create({
      component: AiAssistantPage,
    });
    await modal.present();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    console.log(image.webPath);
  }

  async toggleRecording() {
    if (!this.isRecording) {
      const permission = await VoiceRecorder.requestAudioRecordingPermission();

      if (permission.value) {
        await VoiceRecorder.startRecording();
        this.isRecording = true;
      }
    } else {
      const result = await VoiceRecorder.stopRecording();

      this.isRecording = false;

      console.log(result.value.recordDataBase64);
    }
  }

  async toggleVideoRecording() {
    try {
      if (!this.isRecordingVideo) {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // let mimeType = '';

        // if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
        //   mimeType = 'video/webm;codecs=vp8';
        // } else if (MediaRecorder.isTypeSupported('video/webm')) {
        //   mimeType = 'video/webm';
        // } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        //   mimeType = 'video/mp4';
        // }

        // console.log('MimeType utilisé : ', mimeType);

        this.mediaRecorder = new MediaRecorder(this.stream);

        this.recordedChunks = [];

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, {
            type: 'video/mp4',
          });

          this.videoUrl = URL.createObjectURL(blob);

          console.log(this.videoUrl);
        };

        this.mediaRecorder.start();

        this.isRecordingVideo = true;
      } else {
        this.mediaRecorder.stop();

        this.stream.getTracks().forEach((track) => track.stop());

        this.isRecordingVideo = false;
      }
    } catch (error) {
      console.error('VIDEO ERROR : ', error);
    }
  }
}
