// capture.page.ts
import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.page.html',
  styleUrls: ['./capture.page.scss'],
  standalone:false
})
export class CapturePage {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  // Capturer une photo
  async capturePhoto() {
    const toast = await this.toastCtrl.create({
      message: '📷 Caméra ouverte — fonctionnalité à connecter avec Capacitor Camera',
      duration: 2500,
      color: 'primary',
      position: 'bottom',
    });
    await toast.present();
  }

  // Capturer une vidéo
  async captureVideo() {
    const toast = await this.toastCtrl.create({
      message: '🎬 Caméra vidéo ouverte — à connecter avec Capacitor Camera',
      duration: 2500,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
  }

  // Capturer un audio
  async captureAudio() {
    const toast = await this.toastCtrl.create({
      message: '🎙 Enregistrement audio — à connecter avec Capacitor Microphone',
      duration: 2500,
      color: 'tertiary',
      position: 'bottom',
    });
    await toast.present();
  }

  // Choisir un fichier
  async pickFile() {
    const toast = await this.toastCtrl.create({
      message: '📎 Sélection de fichier — à connecter avec Capacitor FilePicker',
      duration: 2500,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }

  // Obtenir la localisation GPS
  async getLocation() {
    const loading = await this.loadingCtrl.create({
      message: 'Localisation en cours...',
      duration: 2000,
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: '📍 Localisation : Rabat, Maroc (34.0209° N, 6.8416° W)',
        duration: 2500,
        color: 'primary',
        position: 'bottom',
      });
      await toast.present();
    }, 2000);
  }

  // Analyser le média avec l'IA
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

  // Synchroniser tous les médias
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

  // Activer / désactiver mode hors ligne
  async toggleOffline(event: any) {
    const isOn = event.detail.checked;
    const toast = await this.toastCtrl.create({
      message: isOn
        ? '📶 Mode hors ligne activé — stockage local prêt'
        : '🌐 Mode hors ligne désactivé',
      duration: 2000,
      color: isOn ? 'warning' : 'medium',
      position: 'bottom',
    });
    await toast.present();
  }

  // Envoyer vers le serveur
  async submitMedia() {
    const loading = await this.loadingCtrl.create({
      message: 'Envoi vers le serveur...',
      duration: 2500,
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: '✅ Média envoyé avec succès au serveur',
        duration: 2500,
        color: 'success',
        position: 'top',
      });
      await toast.present();
    }, 2500);
  }

  // Sauvegarder en local
  async saveDraftMedia() {
    const toast = await this.toastCtrl.create({
      message: '💾 Média sauvegardé localement',
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });
    await toast.present();
  }
}
