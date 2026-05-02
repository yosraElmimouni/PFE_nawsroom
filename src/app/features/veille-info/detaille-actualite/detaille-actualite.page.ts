import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AiAssistantPage } from '../../ai-assistant/ai-assistant.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detaille-actualite',
  templateUrl: './detaille-actualite.page.html',
  styleUrls: ['./detaille-actualite.page.scss'],
  standalone:false,
})
export class DetailleActualitePage implements OnInit {


@Component({
  selector: 'app-actualite-detail',
  templateUrl: './actualite-detail.page.html',
  styleUrls: ['./actualite-detail.page.scss'],
})

  item: any;

  constructor(private router: Router,
    private modalCtrl:ModalController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.item = nav?.extras?.state?.['item'];
  }

  ngOnInit() {}

  addToArticle() {
    console.log('Ajout à un article', this.item);
  }

 share() {
  const text = `${this.item.title} - ${this.item.summary}`;
  navigator.share
    ? navigator.share({ title: this.item.title, text })
    : alert(text);
}
async openAiAssistant() {
  const modal = await this.modalCtrl.create({
    component: AiAssistantPage,
  });
  await modal.present();
}
}

