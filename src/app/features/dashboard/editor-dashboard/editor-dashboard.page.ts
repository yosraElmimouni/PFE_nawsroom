import { Component, OnInit } from '@angular/core';


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
  time: string;
  title: string;
  summary: string;
}



@Component({
  selector: 'app-editor-dashboard',
  templateUrl: './editor-dashboard.page.html',
  styleUrls: ['./editor-dashboard.page.scss'],
  standalone: false,
})
export class EditorDashboardPage implements OnInit {

  

    today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  
   
  
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
        time: 'il y a 8m',
        title: 'Maroc-France : renforcement de la coopération en matière d\'énergies renouvelables',
        summary: 'Les deux gouvernements ont signé un accord-cadre portant sur l\'hydrogène vert et le solaire, selon des sources officielles.',
      },
      {
        id: 2,
        source: 'Reuters Afrique',
        time: 'il y a 22m',
        title: 'CAN 2025 : la FIFA confirme le Maroc comme co-organisateur officiel',
        summary: 'La décision finale a été annoncée lors de la réunion du comité exécutif à Zurich ce matin.',
      },
      {
        id: 3,
        source: 'Le Monde Afrique',
        time: 'il y a 45m',
        title: 'Économie marocaine : croissance de 3,8% attendue pour 2025 selon le FMI',
        summary: 'Le rapport annuel du Fonds Monétaire International salue les réformes structurelles engagées depuis 2022.',
      },
    ];
  
    get filteredArticles(): Article[] {
      return this.articles;
    }
  
    constructor() {}
  
    ngOnInit() {}
  
  
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
    }
  
    onArticleTap(article: Article) {
      console.log('Open article:', article.id);
    }
  
    onFeedTap(item: FeedItem) {
      console.log('Open feed item:', item.id);
    }
  
    onCapture() {
      console.log('Open capture modal');
    }
  

}
