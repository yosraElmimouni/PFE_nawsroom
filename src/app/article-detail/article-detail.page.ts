import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, MenuController, ToastController } from '@ionic/angular';

export interface Article {
  id: string;
  status: 'published' | 'draft' | 'review';
  statusLabel: string;
  category: string;
  date: string;
  title: string;
  lead: string;
  body: string;
  author: string;
  authorInitials: string;
  authorRole: string;
  imageBg: string;
  imageCaption: string;
  views?: number;
  comments?: number;
  progress?: number;
  wordCount?: number;
  aiTags: string[];
  aiSuggestion: string;
  neutralityScore: number;
  readabilityScore: number;
  mediaCount: number;
  media: { type: string; bg: string; label: string }[];
}

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  standalone:false
})
export class ArticleDetailPage implements OnInit {

  article: Article = {
    id: '1',
    status: 'published',
    statusLabel: 'Publié',
    category: 'Politique',
    date: 'Il y a 2h',
    title: 'Réforme constitutionnelle : le débat s\'intensifie au parlement',
    lead: 'Le gouvernement présente son projet ce mardi, suscitant de vives réactions au sein de l\'hémicycle et dans l\'opinion publique.',
    body: `
      <p>Le Premier ministre a présenté ce mardi matin devant l'Assemblée nationale son projet de réforme constitutionnelle, une initiative qui vise à renforcer les prérogatives du pouvoir exécutif tout en encadrant davantage le contrôle parlementaire.</p>
      <p>Les groupes d'opposition ont immédiatement réagi, dénonçant ce qu'ils qualifient d'"dérive autoritaire". Plusieurs partis ont annoncé leur intention de soumettre le texte au Conseil constitutionnel.</p>
      <p>Du côté de la majorité, on souligne que ce projet est le fruit de deux années de concertation avec les acteurs civils et institutionnels. "Il s'agit de moderniser nos institutions", a déclaré le porte-parole du gouvernement.</p>
    `,
    author: 'A. Hammou',
    authorInitials: 'AH',
    authorRole: 'Journaliste politique',
    imageBg: 'linear-gradient(135deg, #0f2942 0%, #1e4a7a 60%, #2d6da8 100%)',
    imageCaption: 'Palais du parlement, session plénière • © NewsRoom',
    views: 2340,
    comments: 14,
    aiTags: ['réforme', 'parlement', 'constitution', 'opposition', 'majorité'],
    aiSuggestion: 'Ajouter une citation d\'expert externe pour renforcer la crédibilité de l\'article.',
    neutralityScore: 7.2,
    readabilityScore: 8.5,
    mediaCount: 2,
    media: [
      { type: 'image', bg: 'linear-gradient(135deg,#0f2942,#1e4a7a)', label: 'Photo 1' },
      { type: 'video', bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', label: 'Vidéo 1' },
    ],
  };


  constructor(
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // TODO: charger l'article depuis le service
    // this.articleService.getById(id).subscribe(a => this.article = a);
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      published: 'success',
      draft: 'warning',
      review: 'tertiary',
    };
    return map[status] ?? 'medium';
  }

  async presentActionSheet() {
    const sheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        { text: 'Partager', icon: 'share-outline', handler: () => this.openShare() },
        { text: 'Archiver', icon: 'archive-outline', handler: () => this.archiveArticle() },
        { text: 'Historique', icon: 'time-outline', handler: () => this.viewHistory() },
        { text: 'Annuler', icon: 'close', role: 'cancel' },
      ],
    });
    await sheet.present();
  }

  async openShare() {
    const toast = await this.toastCtrl.create({
      message: 'Lien copié dans le presse-papier',
      duration: 2000,
      color: 'dark',
      position: 'bottom',
    });
    await toast.present();
  }

  editArticle() { /* navigate to editor */ }
  continueEditing() { /* navigate to editor */ }
  viewHistory() { /* navigate to history */ }
  approveArticle() { /* call API */ }
  requestCorrections() { /* open modal */ }
  archiveArticle() { /* call API */ }
  async aiAssist() { /* open AI modal */ }
}