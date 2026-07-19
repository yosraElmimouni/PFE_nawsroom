import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';
import { CloudinaryService } from './services/cloudinary.service';
import { ServiceCapture } from './services/service-capture';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
  standalone:false
})
export class CapturePage {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router:Router,
    private cloudinaryService: CloudinaryService,
    private mediaService: ServiceCapture
  ) {}

  async capturePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri, // On récupère l'URI locale
        source: CameraSource.Camera
      });

      if (image.webPath) {
        // Conversion de l'URI en File pour Cloudinary
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });

        await this.uploadToCloudinary(file, 'photo');
      }
    } catch (error) {
      console.error('Erreur capture photo', error);
    }
  }

  async uploadToCloudinary(file: File, type: string) {
    const loading = await this.loadingCtrl.create({
      message: `Téléchargement du média (${type})...`
    });
    await loading.present();

    try {
      const result = await this.cloudinaryService.uploadMedia(file);
      console.log('Upload réussi ! URL Cloudinary :', result.secure_url);
      
      await loading.dismiss();
      this.showToast(`Média ${type} envoyé avec succès !`, 'success');

      // Redirection vers la page d'infos avec l'URL Cloudinary
      this.router.navigate(['/capture/infos-media', type], {
        queryParams: { url: result.secure_url }
      });

    } catch (error) {
      await loading.dismiss();
      this.showToast("Erreur lors de l'envoi vers Cloudinary", 'danger');
      console.error(error);
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

 submitMedia(name:string) {
      this.router.navigate(['/capture/infos-media',name]);
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
}
