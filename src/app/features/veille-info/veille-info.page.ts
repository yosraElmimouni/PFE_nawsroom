import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { AiAssistantPage } from '../ai-assistant/ai-assistant.page';
import { NewsItem } from 'src/app/core/models/NewsItem.model';
import { ServiceVeille } from './service-veille';

@Component({
  selector: 'app-veille-info',
  templateUrl: './veille-info.page.html',
  styleUrls: ['./veille-info.page.scss'],
  standalone: false,
})
export class VeilleInfoPage implements OnInit {
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
  filteredFeedItems: NewsItem[] = [];
  sources: string[] = [];
  domaines: string[] = [];
  isCalendarOpen: boolean = false;
  todayIso: string = new Date().toISOString();
  selectedSource: string = '';
  selectedDomaine: string = '';
  isAiGenerate: boolean = false;
  articles = [];
  feedItems: NewsItem[] = [];
  selectedDate: string = new Date().toISOString();
  isDateModalOpen: boolean = false;
  isLoading: boolean = false;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private serviceVeille: ServiceVeille,
  ) {}

  ngOnInit() {
    this.loadNews();
    // Ne mettez pas de log ici, les données ne sont pas encore arrivées !
  }

  loadNews() {
    this.isLoading = true;
    this.serviceVeille.getNewsItems().subscribe({
      next: (data) => {
        console.log('Données reçues du serveur :', data);

        this.feedItems = data.map((item) => ({
          ...item,
          isAiGenerating: false,
          aicontenu: null,
        }));

        this.sources = [
          ...new Set(this.feedItems.map((item) => item.source.nom)),
        ];

        this.applyFilters();
        this.isLoading = false;

        console.log('Articles après filtrage :', this.filteredFeedItems);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des news', err);
        this.isLoading = false;
      },
    });
  }

  applyFilters() {
    this.filteredFeedItems = this.feedItems.filter((item) => {
      const matchSource =
        !this.selectedSource || item.source.nom === this.selectedSource;

      const matchDomaine =
        !this.selectedDomaine || item.categorie === this.selectedDomaine;

      let matchDate = true;
      if (this.selectedDate) {
        const selected = new Date(this.selectedDate);
        const itemDate = new Date(item.datePublication);
        matchDate =
          itemDate.getFullYear() === selected.getFullYear() &&
          itemDate.getMonth() === selected.getMonth() &&
          itemDate.getDate() === selected.getDate();
      }

      return matchSource && matchDomaine && matchDate;
    });
  }

  openDatePicker() {
    this.isDateModalOpen = true;
  }
  goToProduction() {
    this.router.navigate(['/articles'], {
      queryParams: { view: 'production' },
    });
  }
  AiResume(item: any) {
    if (item.aicontenu || item.isAiGenerating) return;

    item.isAiGenerating = true;

    setTimeout(() => {
      item.aicontenu =
        'Accord stratégique entre les deux pays visant à développer les énergies renouvelables, avec un accent particulier sur l’hydrogène vert et le solaire.';
      item.isAiGenerating = false;
    }, 1200);
  }
  goToDetail(item: any) {
    this.router.navigate(['/veille/detaille-actualite', item.id], {
      state: { item },
    });
  }

  async openAiAssistant() {
    const modal = await this.modalCtrl.create({
      component: AiAssistantPage,
    });
    await modal.present();
  }

  

toggleCalendar() {
  this.isCalendarOpen = !this.isCalendarOpen;
}

onDateSelected() {
  this.isCalendarOpen = false;
  this.applyFilters();
}

clearDate(event: Event) {
  event.stopPropagation();
  this.selectedDate = '';
  this.isCalendarOpen = false;
  this.applyFilters();
}
}
