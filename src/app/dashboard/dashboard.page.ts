import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

export interface Article {
  id: number;
  title: string;
  status: 'progress' | 'published' | 'draft' | 'urgent';
  date: Date;
  image:string,
  author: string;
}

export interface FeedItem {
  id: number;
  source: string;
  sourceColor: string;
  time: string;
  title: string;
  summary: string;
}

export interface StatCard {
  icon: string;
  value: number | string;
  valueColor: string;
  label: string;
  delta: string;
  deltaColor: string;
  active?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  activeTab: 'progress' | 'published' | 'draft' = 'progress';
  today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  stats: StatCard[] = [
    {
      icon: "pencil-outline",
      value: 4,
      valueColor: '#C8A96E',
      label: 'En cours',
      delta: '+2 auj.',
      deltaColor: '#C8A96E88',
      active: true,
    },
    {
      icon: 'checkmark-done-outline',
      value: 12,
      valueColor: '#f7d6a2',
      label: 'Publiés',
      delta: 'ce mois',
      deltaColor: '#4aaa70',
    },
    {
      icon: "diamond-outline",
      value: 38,
      valueColor: '#9b7acc',
      label: 'IA utilisée',
      delta: 'requêtes',
      deltaColor: '#9b7acc88',
    },
    {
      icon: 'document-text-outline',
      value: 3,
      valueColor: '#8d7856',
      label: 'Brouillons',
      delta: 'en attente',
      deltaColor: '#3a3a42',
    },
  ];

  aiActions = [
    { label: 'Générer article', key: 'generate' ,'icon':"sparkles-outline"},
    { label: 'Résumer', key: 'summarize' ,'icon':"reload-outline"},
    { label: 'Corriger', key: 'correct' ,'icon':"pencil-outline"},
    { label: 'Tags auto', key: 'tags' ,'icon':"bookmark-outline"},
  ];

  articles: Article[] = [
  {
    id: 1,
    title: 'La réforme du code du travail suscite des réactions mitigées au sein des syndicats.',
    status: 'progress',
    date: new Date(), 
    image: '',
    author: 'A. Hajji',
  },
  {
    id: 2,
    title: 'Bourse de Casablanca : le MASI franchit un nouveau seuil historique',
    status: 'urgent',
    date: new Date('2026-04-18T13:15:00'),
    image: '',
    author: 'A. Hajji',
  },
  {
    id: 3,
    title: 'Sommet Afrique-UE : vers un nouveau partenariat économique stratégique',
    status: 'draft',
    date: new Date('2026-04-17'),
    image: '',
    author: 'A. Hajji',
  },
  { id: 4, title: 'Élections régionales : la participation en hausse de 8 points par rapport à 2021', status: 'published', date:new Date() , image:'', author: 'A. Hajji' },
];

  feedItems: FeedItem[] = [
    {
      id: 1,
      source: 'MAP — Maghreb Arabe Presse',
      sourceColor: '#E85C3A',
      time: 'il y a 8m',
      title: 'Maroc-France : renforcement de la coopération en matière d\'énergies renouvelables',
      summary: 'Les deux gouvernements ont signé un accord-cadre portant sur l\'hydrogène vert et le solaire, selon des sources officielles.',
    },
    {
      id: 2,
      source: 'Reuters Afrique',
      sourceColor: '#7aabde',
      time: 'il y a 22m',
      title: 'CAN 2025 : la FIFA confirme le Maroc comme co-organisateur officiel',
      summary: 'La décision finale a été annoncée lors de la réunion du comité exécutif à Zurich ce matin.',
    },
    {
      id: 3,
      source: 'Le Monde Afrique',
      sourceColor: '#C8A96E',
      time: 'il y a 45m',
      title: 'Économie marocaine : croissance de 3,8% attendue pour 2025 selon le FMI',
      summary: 'Le rapport annuel du Fonds Monétaire International salue les réformes structurelles engagées depuis 2022.',
    },
  ];

  get filteredArticles(): Article[] {
    return this.articles.filter(a => a.status === this.activeTab ||
      (this.activeTab === 'progress' && a.status === 'urgent'));
  }

  constructor() {}

  ngOnInit() {}

  setTab(tab: 'progress' | 'published' | 'draft') {
    this.activeTab = tab;
  }

  getBadgeClass(status: string): string {
    const map: Record<string, string> = {
      progress: 'badge-progress',
      published: 'badge-published',
      draft: 'badge-draft',
      urgent: 'badge-urgent',
    };
    return map[status] || 'badge-draft';
  }

  getBadgeLabel(status: string): string {
    const map: Record<string, string> = {
      progress: 'En cours',
      published: 'Publié',
      draft: 'Brouillon',
      urgent: 'URGENT',
    };
    return map[status] || status;
  }

  onAiAction(key: string) {
    console.log('AI action:', key);
    // Navigate to AI assistant page or open modal
  }

  onArticleTap(article: Article) {
    console.log('Open article:', article.id);
    // Navigate to article editor
  }

  onFeedTap(item: FeedItem) {
    console.log('Open feed item:', item.id);
  }

  onCapture() {
    console.log('Open capture modal');
  }
}
