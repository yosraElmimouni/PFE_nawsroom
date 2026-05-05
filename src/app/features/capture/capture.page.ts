// capture.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { routes } from 'src/app/app-routing.module';

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
    private router:Router
  ) {}

  async capturePhoto() {
    const toast = await this.toastCtrl.create({
      message: ' Caméra ouverte — fonctionnalité à connecter avec Capacitor Camera',
      duration: 2500,
      color: 'primary',
      position: 'bottom',
    });
    await toast.present();
  }

  // Capturer une vidéo
  async captureVideo() {
    const toast = await this.toastCtrl.create({
      message: ' Caméra vidéo ouverte — à connecter avec Capacitor Camera',
      duration: 2500,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
  }

  // Capturer un audio
  async captureAudio() {
    const toast = await this.toastCtrl.create({
      message: ' Enregistrement audio — à connecter avec Capacitor Microphone',
      duration: 2500,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  // Choisir un fichier
  async pickFile() {
    const toast = await this.toastCtrl.create({
      message: ' Sélection de fichier — à connecter avec Capacitor FilePicker',
      duration: 2500,
      color: 'success',
      position: 'bottom',
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
