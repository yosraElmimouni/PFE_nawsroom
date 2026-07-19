import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/core/models/Agenda.model';
import { Router } from '@angular/router';
import { ServiceAgenda } from './service-agenda';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {
  events: Agenda[] = [];
  dateDebutFilter!: string;
  dateFinFilter!: string;
  isLoading = true;
  errorMessage = '';
  isFiltersReady = false;
  activeCalendar: 'debut' | 'fin' | null = null;

  constructor(
    private router: Router,
    private agendaService: ServiceAgenda,
  ) {}

  ngOnInit() {
    this.initDefaultFilters();
    this.loadAgendas();
  }
  initDefaultFilters() {
    const now = new Date();

    // Premier jour du mois actuel
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    firstDay.setHours(0, 0, 0, 0);
    this.dateDebutFilter = firstDay.toISOString();

    // Dernier jour du mois actuel
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    this.dateFinFilter = lastDay.toISOString();

    this.isFiltersReady = true; // ✅ filters prêts
  }
  loadAgendas() {
    this.isLoading = true;
    this.agendaService.getAgendas().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement agendas', err);
        this.errorMessage = 'Impossible de charger les événements.';
        this.isLoading = false;
      },
    });
  }

  get filteredEvents() {
    return this.events.filter((event) => {
      const debut = new Date(event.dateDebut);
      const fin = new Date(event.dateFin);

      if (this.dateDebutFilter) {
        const dateDebut = new Date(this.dateDebutFilter);
        dateDebut.setHours(0, 0, 0, 0);
        if (debut < dateDebut) return false;
      }

      if (this.dateFinFilter) {
        const dateFin = new Date(this.dateFinFilter);
        dateFin.setHours(23, 59, 59, 999);
        if (fin > dateFin) return false;
      }

      return true;
    });
  }

  openDetail(event: Agenda) {
    this.router.navigate(['/agenda/detail'], {
      state: { event },
    });
  }

  toggleCalendar(type: 'debut' | 'fin') {
    this.activeCalendar = this.activeCalendar === type ? null : type;
  }

  onDateChange() {
    this.activeCalendar = null; // ferme après sélection
  }
}
