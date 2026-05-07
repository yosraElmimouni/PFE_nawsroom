import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { routes } from '../../../app-routing.module';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import pkg from './../../../../../package.json'
// export interface Article {
//   id: number;
//   title: string;
//   status: 'progress' | 'published' | 'draft' | 'urgent';
//   date: Date;
//   image:string,
//   author: string;
// }

// export interface FeedItem {
//   id: number;
//   source: string;
//   sourceColor: string;
//   time: string;
//   title: string;
//   summary: string;
// }

export interface StatCard {
  icon: string;
  value: number | string;
  valueColor: string;
  label: string;
  deltaColor: string;
  active?: boolean;
}

@Component({
  selector: 'app-dashboard-journaliste',
  templateUrl: './dashboard-journaliste.page.html',
  styleUrls: ['./dashboard-journaliste.page.scss'],
  standalone: false,
})
export class DashboardJournalistePage implements OnInit {
  version="1.0"
  activeModule: string = 'redaction';
  activeTab: 'progress' | 'published' | 'draft' = 'progress';
  today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  profile = {
        name: 'Amine H.',
        role: 'Journaliste',
        initials: 'AH'
      };
  stats: StatCard[] = [
    {
      icon: "pencil-outline",
      value: 4,
      valueColor: '#C8A96E',
      label: 'En cours',
      deltaColor: '#0350c3',
      
    },
    {
      icon: 'checkmark-done-outline',
      value: 12,
      valueColor: '#f7d6a2',
      label: 'Publiés',
      deltaColor: '#4aaa70',
    },
    {
      icon: "diamond-outline",
      value: 38,
      valueColor: '#9b7acc',
      label: 'IA utilisée',
      deltaColor: '#9b7acc88',
    },
    {
      icon: 'document-text-outline',
      value: 3,
      valueColor: '#8d7856',
      label: 'Brouillons',
      deltaColor: '#3a3a42',
    },
  ];
  

  modules = [
    { id:1, name: 'Redaction', icon: 'pencil' },
    { id:2, name: 'Capture',  icon: 'camera' },
    { id:3, name: 'Veille',    icon: 'eye' },
    { id:4, name: 'Fusion',    icon: 'git-merge' },
    { id:5, name: 'Articles',  icon: 'newspaper' },
    { id:6, name: 'Profil',    icon: 'person' },

  ];

  constructor( private router:Router) {}

  async ngOnInit(): Promise<void> {
    const currentUrl = this.router.url;
    for (let m of this.modules) {
      if (currentUrl.includes(m.name.toLowerCase())) {
        this.activeModule = m.name.toLowerCase();
        return;
      }
      else {        
        this.activeModule = 'redaction';
      }
    }
    
if (Capacitor.isNativePlatform()) {
      const info = await App.getInfo();
      this.version = info.version; // Android / iOS
    } else {
      this.version = pkg.version;  // Web
    }

    
  }
 
  navigateTo(module: string): void {
    this.activeModule = module;
      const path = routes.find(r => r.path === module)?.path;
      if (path) {
        this.router.navigate([`/${path.toLocaleLowerCase()}`]);
      } else {
        console.warn('No route found for module:', module);
      }
  }


  setTab(tab: 'progress' | 'published' | 'draft') {
    this.activeTab = tab;
  }

 production = {
  inProgress: 4,
  drafts: 3,
  published: 28,
};
quickAction(module: string): void {
    const actions: Record<string, string> = {
      redaction : '/redaction/new',
      collecte  : '/collecte/capture',
      veille    : '/veille/alerts',
    };
 
    this.router.navigate([actions[module]]);
  }

goToProduction() {
  this.router.navigate(['/articles'], {
    queryParams: { view: 'production' }
  });
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
  }

  // onArticleTap(article: Article) {
  //   console.log('Open article:', article.id);
  // }

  // onFeedTap(item: FeedItem) {
  //   console.log('Open feed item:', item.id);
  // }

  // onCapture() {
  //   console.log('Open capture modal');
  // }
}
