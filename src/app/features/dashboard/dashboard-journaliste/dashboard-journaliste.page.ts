import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { routes } from '../../../app-routing.module';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import pkg from './../../../../../package.json';
import { MsalService } from '@azure/msal-angular';
import { StatCard } from 'src/app/core/models/StatCard.model';
import { ArticleService } from '../../articles/services/article.service';
import { ArticleStatus } from 'src/app/core/models/enums/ArticleStatus';
import { ServiceDashJournaliste } from '../services/service-dash-journaliste';

@Component({
  selector: 'app-dashboard-journaliste',
  templateUrl: './dashboard-journaliste.page.html',
  styleUrls: ['./dashboard-journaliste.page.scss'],
  standalone: false,
})
export class DashboardJournalistePage implements OnInit {
  version = '1.0';
  activeModule: string = 'redaction';
  activeTab: 'progress' | 'published' | 'draft' = 'progress';
  today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  profile = {
    name: 'Amine H.',
    role: 'Journaliste',
    initials: 'AH',
  };
  stats: StatCard[] = [
    {
      icon: 'pencil-outline',
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
      icon: 'document-text-outline',
      value: 3,
      valueColor: '#8d7856',
      label: 'Brouillons',
      deltaColor: '#3a3a42',
    },
  ];

  modules = [
    { id: 3, name: 'Veille', icon: 'radio' },
    { id: 8, name: 'Agenda', icon: 'calendar' },
    { id: 5, name: 'Articles', icon: 'library' },
    { id: 1, name: 'Redaction', icon: 'create' },
    { id: 2, name: 'Capture', icon: 'scan' },
    { id: 4, name: 'Fusion', icon: 'git-merge' },
    { id: 6, name: 'Profil', icon: 'person' },
    { id: 7, name: 'Déconnexion', icon: 'log-out' },
  ];

  constructor(
    private router: Router,
    private msalService: MsalService,
    private articleService: ServiceDashJournaliste,
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadStats();
    const currentUrl = this.router.url;
    for (let m of this.modules) {
      if (currentUrl.includes(m.name.toLowerCase())) {
        this.activeModule = m.name.toLowerCase();
        return;
      } else {
        this.activeModule = 'redaction';
      }
    }

    if (Capacitor.isNativePlatform()) {
      const info = await App.getInfo();
      this.version = info.version; // Android / iOS
    } else {
      this.version = pkg.version; // Web
    }
  }

  loadStats() {
    this.articleService
      .getArticleCountByStatus(ArticleStatus.Brouillon)
      .subscribe((count) => {
        this.production.drafts = count;

        this.stats[2].value = count;
      });

    this.articleService
      .getArticleCountByStatus(ArticleStatus.Publier)
      .subscribe((count) => {
        this.production.published = count;

        this.stats[1].value = count;
      });

    
  }

  navigateTo(module: string): void {
    this.activeModule = module;
    const path = routes.find((r) => r.path === module)?.path;
    if (path) {
      this.router.navigate([`/${path.toLocaleLowerCase()}`]);
    } else if (module === 'déconnexion') {
      this.logout();
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
      redaction: '/redaction/new',
      collecte: '/collecte/capture',
      veille: '/veille/alerts',
    };

    this.router.navigate([actions[module]]);
  }

  goToProduction() {
    this.router.navigate(['/articles'], {
      queryParams: { view: 'production' },
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

  logout() {
    if (Capacitor.isNativePlatform()) {
      localStorage.clear();
      // pas de redirect, on reste sur login
    } else {
      this.msalService.logoutRedirect({
        postLogoutRedirectUri: 'http://localhost:8100',
      });
    }
  }

  get total(): number {
    return (
      this.production.published +
      this.production.inProgress +
      this.production.drafts
    );
  }
}
