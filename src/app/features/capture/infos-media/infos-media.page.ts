import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import { Geolocation } from '@capacitor/geolocation';
import { CloudinaryService } from '../services/cloudinary.service';
import { ServiceCapture } from '../services/service-capture';
import { Media } from 'src/app/core/models/media.model';
import { MediaType } from 'src/app/core/models/enums/MediaType';
import { ArticleService } from '../../articles/services/article.service';
import { Article } from 'src/app/core/models/article.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-infos-media',
  templateUrl: './infos-media.page.html',
  styleUrls: ['./infos-media.page.scss'],
  standalone: false,
})
export class InfosMediaPage implements OnInit {
  media: any = {
    type: '',
    urlFichier: '',
    titre: '',
    description: '',
    localisation: '',
    author: '',
    dateCapture: '',
  };
suggestions: any[] = [];
showSuggestions: boolean = false;
isSearching: boolean = false;
mapVisible: boolean = false;
private map: L.Map | null = null;
private marker: L.Marker | null = null;
private searchTimeout: any;

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
  articles: Article[] = [] ;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private cloudinaryService: CloudinaryService,
    private mediaService: ServiceCapture,
    private articleService:ArticleService
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.articleService.getArticles().subscribe((data: Article[]) => {
        this.articles = data;
      });
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
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (image.webPath) {
        const loading = await this.loadingCtrl.create({
          message: 'Upload de la photo...',
        });
        await loading.present();

        const response = await fetch(image.webPath);
        const blob = await response.blob();
        const file = new File([blob], `photo_${Date.now()}.jpg`, {
          type: 'image/jpeg',
        });

        const result = await this.cloudinaryService.uploadMedia(file);
        this.media.url = result.secure_url; // On stocke l'URL reçue

        await loading.dismiss();
        this.showToast('Photo uploadée avec succès !', 'success');
      }
    } catch (error) {
      console.error('Erreur photo:', error);
    }
  }
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2500,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }

  async toggleRecording() {
    if (!this.isRecording) {
      const permission = await VoiceRecorder.requestAudioRecordingPermission();

      if (permission.value) {
        await VoiceRecorder.startRecording();

        this.isRecording = true;
      }
    } else {
      try {
        const loading = await this.loadingCtrl.create({
          message: "Upload de l'audio...",
        });

        await loading.present();

        // Stop recording
        const result = await VoiceRecorder.stopRecording();

        if (result.value?.recordDataBase64) {
          // Base64 -> Blob
          const audioBlob = this.b64toBlob(
            result.value.recordDataBase64,
            'audio/mp3',
          );

          // Preview audio locale
          this.audioUrl = URL.createObjectURL(audioBlob);

          // Blob -> File
          const file = new File([audioBlob], `audio_${Date.now()}.mp3`, {
            type: 'audio/mp3',
          });

          const cloudResult = await this.cloudinaryService.uploadMedia(file);

          console.log('AUDIO CLOUDINARY:', cloudResult);

          this.media.url = cloudResult.secure_url;

          await loading.dismiss();

          this.showToast('Audio uploadé avec succès', 'success');
        }

        this.isRecording = false;
      } catch (error) {
        console.error('AUDIO ERROR:', error);

        this.isRecording = false;

        this.showToast('Erreur upload audio', 'danger');
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

        this.mediaRecorder.onstop = async () => {
          try {
            const loading = await this.loadingCtrl.create({
              message: 'Upload de la vidéo...',
            });

            await loading.present();

            // Création blob
            const blob = new Blob(this.recordedChunks, {
              type: 'video/mp4',
            });

            // Preview locale
            this.videoUrl = URL.createObjectURL(blob);

            // Conversion File
            const file = new File([blob], `video_${Date.now()}.mp4`, {
              type: 'video/mp4',
            });

            // Upload Cloudinary
            const result = await this.cloudinaryService.uploadMedia(file);

            console.log('VIDEO CLOUDINARY:', result);

            // Sauvegarde URL
            this.media.url = result.secure_url;

            await loading.dismiss();

            this.showToast('Vidéo uploadée avec succès', 'success');
          } catch (error) {
            console.error('UPLOAD VIDEO ERROR:', error);

            this.showToast('Erreur upload vidéo', 'danger');
          }
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
          const latitude = position.coords.latitude;

          const longitude = position.coords.longitude;

          console.log(latitude, longitude);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();

          this.locationText = data.display_name;

          console.log(this.locationText);
        },

        (error) => {
          console.error(error);
        },
      );
    } catch (error) {
      console.error('LOCATION ERROR : ', error);
    }
  }

  async submitMedia() {
    if (!this.media.url) {
      this.showToast("Veuillez d'abord capturer un média", 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Enregistrement final...',
    });
    await loading.present();

    const finalData = {
      titre: this.media.titre,
      description: this.media.description,
      urlFichier: this.media.url,
      type: this.name as any,
      dateCapture: new Date().toISOString(),
      localisation: this.locationText,
      author: 'Amine H.',
      article:this.linkedArticle,
    };

    this.mediaService.createMedia(finalData as any).subscribe({
      next: () => {
        loading.dismiss();
        this.showToast('Média enregistré avec succès !', 'success');
        this.router.navigate(['/capture']);
      },
      error: (err) => {
        loading.dismiss();
        this.showToast("Erreur lors de l'enregistrement", 'danger');
      },
    });
  }


onLieuSearch() {
  clearTimeout(this.searchTimeout);
  if (this.locationText.length < 3) {
    this.suggestions = [];
    return;
  }
  this.isSearching = true;
  this.searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.locationText)}&limit=5`,
        { headers: { 'Accept-Language': 'fr' } }
      );
      this.suggestions = await res.json();
    } catch (e) {
      this.suggestions = [];
    } finally {
      this.isSearching = false;
    }
  }, 400);
}

selectSuggestion(s: any) {
  this.locationText = s.display_name;
  this.suggestions = [];
  this.showSuggestions = false;
  this.mapVisible = true;
  setTimeout(() => this.initMap(parseFloat(s.lat), parseFloat(s.lon)), 100);
}

initMap(lat: number, lon: number) {
  if (this.map) {
    this.map.setView([lat, lon], 14);
    this.marker?.setLatLng([lat, lon]);
    return;
  }
  this.map = L.map('lieu-map').setView([lat, lon], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(this.map);
  this.marker = L.marker([lat, lon], { draggable: true }).addTo(this.map);

  this.marker.on('dragend', async (e) => {
    const pos = (e.target as L.Marker).getLatLng();
    await this.reverseGeocode(pos.lat, pos.lng);
  });

  this.map.on('click', async (e: L.LeafletMouseEvent) => {
    this.marker?.setLatLng(e.latlng);
    await this.reverseGeocode(e.latlng.lat, e.latlng.lng);
  });
}

async reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: { 'Accept-Language': 'fr' } }
    );
    const data = await res.json();
    this.locationText = data.display_name;
  } catch (e) {
    console.error('Reverse geocode error', e);
  }
}

clearLieu() {
  this.locationText = '';
  this.suggestions = [];
  this.mapVisible = false;
  if (this.map) {
    this.map.remove();
    this.map = null;
    this.marker = null;
  }
}

ngOnDestroy() {
  if (this.map) this.map.remove();
}

}
