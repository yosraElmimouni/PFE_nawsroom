import { Component, OnInit } from '@angular/core';
import { EventAgenda } from 'src/app/core/models/EventAgenda.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false,
})
export class AgendaPage implements OnInit {
  events: EventAgenda[] = [];
  dateDebutFilter!: string;
  dateFinFilter!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.events = [
      {
        id:1,
        titre: 'Conférence de presse Ministère',
        categorie: 'Politique',
        resume: 'Annonce officielle des nouvelles réformes',
        importance: 'important',
        dateDebut: new Date('2026-05-08'),
        dateFin: new Date('2026-05-09'),
        lieu: 'Rabat',
      },
      {
        id:2,
        titre: 'Interview exclusive PDG startup',
        categorie: 'Économie',
        resume: 'Discussion sur l’innovation technologique au Maroc',
        importance: 'important',
        dateDebut: new Date('2026-05-09'),
        dateFin: new Date('2026-05-10'),
        lieu: 'Casablanca - Technopark',
      },
      {
        id:3,
        titre: 'Reportage terrain - Quartier populaire',
        categorie: 'Société',
        resume: 'Conditions de vie et témoignages des habitants',
        importance: 'normale',
        dateDebut: new Date('2026-05-10'),
        dateFin: new Date('2026-05-11'),
        lieu: 'Casablanca',
      },
      {
        id:4,
        titre: 'Couverture événement sportif',
        categorie: 'Sport',
        resume: 'Match de championnat et interviews joueurs',
        importance: 'normale',
        dateDebut: new Date('2026-05-11'),
        dateFin: new Date('2026-05-12'),
        lieu: 'Stade Mohammed V',
      },
      {
        id:5,
        titre: 'Conférence internationale média',
        categorie: 'Média',
        resume: 'Transformation digitale du journalisme',
        importance: 'important',
        dateDebut: new Date('2026-05-12'),
        dateFin: new Date('2026-05-13'),
        lieu: 'Marrakech',
      },
      {
        id:6,
        titre: 'Rédaction article d’enquête',
        categorie: 'Travail',
        resume: 'Finalisation d’un dossier sur la corruption',
        importance: 'important',
        dateDebut: new Date('2026-05-13'),
        dateFin: new Date('2026-05-14'),
        lieu: 'Rédaction',
      },
      {
        id:7,
        titre: 'Conférence culturelle',
        categorie: 'Culture',
        resume: 'Couverture d’un festival artistique',
        importance: 'normale',
        dateDebut: new Date('2026-05-14'),
        dateFin: new Date('2026-05-20'),
        lieu: 'Théâtre municipal',
      },
    ];
  }

  get filteredEvents() {
    return this.events.filter((event) => {
      const debut = new Date(event.dateDebut);
      const fin = new Date(event.dateFin);

      if (this.dateDebutFilter) {
        const dateDebut = new Date(this.dateDebutFilter);
        dateDebut.setHours(0, 0, 0, 0);

        if (debut < dateDebut) {
          return false;
        }
      }

      if (this.dateFinFilter) {
        const dateFin = new Date(this.dateFinFilter);
        dateFin.setHours(23, 59, 59, 999);

        if (fin > dateFin) {
          return false;
        }
      }

      return true;
    });
  }

  openDetail(event: any) {
    this.router.navigate(['/agenda/detail'], {
      state: {
        event: event,
      },
    });
  }
}
