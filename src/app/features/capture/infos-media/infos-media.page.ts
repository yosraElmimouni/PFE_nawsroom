import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-infos-media',
  templateUrl: './infos-media.page.html',
  styleUrls: ['./infos-media.page.scss'],
  standalone: false,
})
export class InfosMediaPage implements OnInit {
  media = {
    title: '',
    description: '',
    location: '',
    type: '',
    articleId: null,
  };
  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];
  videoUrl: string = '';
  stream!: MediaStream;
  isRecordingVideo = false;
  isRecording = false;
  showArticleSelector = false;
  name!: string | null;
  audioUrl: string = '';
  linkedArticle: any = null;
  latitude: number | null = null;
  longitude: number | null = null;
  locationText: string = '';
  articles = [
    {
      id: 1,
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      categorie: 'Politique',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: "Réforme constitutionnelle : le débat s'intensifie au parlement",
      excerpt:
        'Le gouvernement présente son projet ce mardi, suscitant de vives réactions...',
      description:
        "Le gouvernement présente ce mardi matin devant l'Assemblée nationale son projet de réforme constitutionnelle, une initiative qui vise à renforcer les prérogatives du pouvoir exécutif tout en encadrant davantage le contrôle parlementaire. ",
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 1,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1589561253898-768105ca91a8',
          label: 'Façade du parlement',
          author: 'Agence nationale',
          date: '2024-09-21',
        },
        {
          id: 2,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
          label: 'Séance plénière',
          author: 'Photo Presse',
          date: '2024-09-21',
        },
        {
          id: 3,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail: 'https://dummyimage.com/600x400/000/fff.jpg&text=Video',
          label: 'Extrait du débat',
        },
      ],
      progress: 100,
      wordCount: 1250,
      views: 2340,
      comments: 14,
      tags: [
        'Politique',
        'Réforme',
        'Parlement',
        'Gouvernement',
        'Constitution',
        'Débat',
      ],
    },

    {
      id: 2,
      status: 'draft',
      badgeColor: 'secondary',
      badgeLabel: 'Brouillon',
      categorie: 'Environnement & Agriculture',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: 'Sécheresse : les agriculteurs du sud face à la crise hydrique',
      excerpt: 'Reportage de terrain sur les conséquences de la sécheresse...',
      description:
        'La sécheresse qui sévit actuellement dans le sud du pays a des conséquences dramatiques pour les agriculteurs, qui voient leurs récoltes menacées et leurs moyens de subsistance compromis.',
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 21,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Champ asséché',
          author: 'Photo Presse',
          date: '2024-09-20',
        },
        {
          id: 22,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          label: 'Système d’irrigation défaillant',
          author: 'Agence rurale',
          date: '2024-09-20',
        },
        {
          id: 23,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/795548/ffffff.jpg&text=Sécheresse',
          label: 'Témoignage d’un agriculteur',
          duration: '01:45',
        },
      ],
      progress: 58,
      wordCount: 347,
      views: 0,
      comments: 0,
      tags: [
        'Environnement',
        'Agriculture',
        'Sécheresse',
        'Crise hydrique',
        'Climat',
      ],
    },
    {
      id: 3,
      status: 'review',
      badgeColor: 'warning',
      badgeLabel: 'En relecture',
      categorie: 'Transport & Urbanisme',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: 'Lancement du nouveau métro : les défis de la mobilité urbaine',
      excerpt: 'Analyse des enjeux et des perspectives du nouveau métro...',
      description:
        'Le lancement du nouveau métro dans la capitale soulève de nombreux défis en matière de mobilité urbaine.',
      image: 'assets/icon/imagenews.jpeg',
      media: [
        {
          id: 31,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
          label: 'Plan du métro',
          author: 'Direction des transports',
          date: '2024-09-22',
        },
        {
          id: 32,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1518300673615-26c4b35f35c8',
          label: 'Station principale',
          author: 'Urban Photo',
          date: '2024-09-22',
        },
        {
          id: 33,
          type: 'video',
          src: 'https://www.w3schools.com/html/movie.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/607d8b/ffffff.jpg&text=Metro',
          label: 'Vidéo de présentation du métro',
          duration: '02:10',
        },
      ],
      reviewDuration: '3h',
      views: 560,
      comments: 8,
      tags: ['Transport', 'Mobilité', 'Urbanisme', 'Métro', 'Infrastructures'],
    },

    {
      id: 4,
      status: 'published',
      badgeColor: 'success',
      badgeLabel: 'Publié',
      categorie: 'Politique',
      date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      title: 'Élections municipales : les enjeux pour les grandes villes',
      excerpt:
        'Zoom sur les candidats et les programmes pour les municipales...',
      description:
        'À l’approche des élections municipales, les grandes villes du pays sont au cœur de l’attention.',
      image: 'assets/icon/imagenews.jpeg',

      media: [
        {
          id: 41,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1503424886306-4e6586f4b171',
          label: 'Meeting électoral',
          author: 'Agence politique',
          date: '2024-09-23',
        },
        {
          id: 42,
          type: 'image',
          src: 'https://images.unsplash.com/photo-1520975922284-0ccfd69b90be',
          label: 'Affiches de campagne',
          author: 'Photo Presse',
          date: '2024-09-23',
        },
        {
          id: 43,
          type: 'video',
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          thumbnail:
            'https://dummyimage.com/600x400/3f51b5/ffffff.jpg&text=Elections',
          label: 'Discours d’un candidat',
          duration: '02:50',
        },
      ],
      views: 1120,
      comments: 20,
      tags: [
        'Élections',
        'Politique locale',
        'Municipales',
        'Candidats',
        'Programmes',
      ],
    },
  ];

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
   
  }

  async analyzeMedia() {
    const loading = await this.loadingCtrl.create({
      message: 'Analyse IA en cours...',
      duration: 2500,
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: '✨ Analyse IA terminée — tags et description générés',
        duration: 2500,
        color: 'tertiary',
        position: 'bottom',
      });
      await toast.present();
    }, 2500);
  }
  async syncAll() {
    const loading = await this.loadingCtrl.create({
      message: 'Synchronisation en cours...',
      duration: 3000,
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: '☁️ 2 fichiers synchronisés avec succès',
        duration: 2500,
        color: 'success',
        position: 'top',
      });
      await toast.present();
    }, 3000);
  }

  async toggleOffline(event: any) {
    const isOn = event.detail.checked;
    const toast = await this.toastCtrl.create({
      message: isOn
        ? ' Mode hors ligne activé — stockage local prêt'
        : '🌐Mode hors ligne désactivé',
      duration: 2000,
      color: isOn ? 'warning' : 'medium',
      position: 'bottom',
    });
    await toast.present();
  }

  async saveDraftMedia() {
    const toast = await this.toastCtrl.create({
      message: ' Média sauvegardé localement',
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });
    await toast.present();
  }
  openArticleSelector() {
    this.showArticleSelector = true;
  }
  selectArticle(article: any) {
    this.linkedArticle = article;
    this.media.articleId = article.id;
    this.showArticleSelector = false;
  }
  closeArticleSelector() {
    this.showArticleSelector = false;
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

      if (result.value?.recordDataBase64) {
        const audioBlob = this.b64toBlob(
          result.value.recordDataBase64,
          'audio/mp3',
        );

        this.audioUrl = URL.createObjectURL(audioBlob);

        console.log(this.audioUrl);
      }
    }
  }

  async toggleVideoRecording() {
    try {
      if (!this.isRecordingVideo) {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
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

  b64toBlob(b64Data: string, contentType: string) {
    const byteCharacters = atob(b64Data);

    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {
      type: contentType,
    });
  }


 async getLocation() {

  try {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        console.log(latitude, longitude);

        const response = await fetch(

          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

        this.locationText =
          data.display_name;

        console.log(this.locationText);
      },

      (error) => {

        console.error(error);
      }
    );

  } catch (error) {

    console.error(
      'LOCATION ERROR : ',
      error
    );
  }
}
}
