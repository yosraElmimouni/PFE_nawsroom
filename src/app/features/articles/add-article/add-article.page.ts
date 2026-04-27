import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.page.html',
  styleUrls: ['./add-article.page.scss'],
  standalone:false,
})
export class AddArticlePage implements OnInit {

  constructor(private toastCtrl: ToastController) {}
  
  ngOnInit(): void {
    
  }
    async saveDraft() {
      const toast = await this.toastCtrl.create({
        message: 'Brouillon enregistré avec succès',
        duration: 2000,
        color: 'warning',
        position: 'top',
      });
      await toast.present();
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
  
    async aiTitle() {
      const toast = await this.toastCtrl.create({
        message: ' IA : Génération de titres en cours...',
        duration: 2000,
        color: 'tertiary',
        position: 'bottom',
      });
      await toast.present();
    }
  
    async aiKeywords() {
      const toast = await this.toastCtrl.create({
        message: ' IA : Extraction des mots-clés...',
        duration: 2000,
        color: 'tertiary',
        position: 'bottom',
      });
      await toast.present();
    }
  
    async aiSummary() {
      const toast = await this.toastCtrl.create({
        message: ' IA : Résumé automatique en cours...',
        duration: 2000,
        color: 'tertiary',
        position: 'bottom',
      });
      await toast.present();
    }
  
    // Envoi message IA
    async sendAiMessage() {
      const toast = await this.toastCtrl.create({
        message: ' Message envoyé à l\'IA',
        duration: 1500,
        color: 'tertiary',
        position: 'bottom',
      });
      await toast.present();
    }

}
