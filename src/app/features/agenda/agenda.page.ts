import { Component, OnInit } from '@angular/core';
import { EventAgenda } from 'src/app/core/models/EventAgenda.model';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false
})
export class AgendaPage implements OnInit {

  events: EventAgenda[] = [];
  dateDebutFilter!: string;
  dateFinFilter!: string;

  constructor() { }

  ngOnInit() {
   this.events = [
  {
    titre: 'Conférence de presse Ministère',
    categorie: 'Politique',
    resume: 'Annonce officielle des nouvelles réformes',
    importance: 'important',
    dateDebut: new Date('2026-05-08 10:00'),
    dateFin: new Date('2026-05-08 12:00'),
    lieu: 'Rabat'
  },
  {
    titre: 'Interview exclusive PDG startup',
    categorie: 'Économie',
    resume: 'Discussion sur l’innovation technologique au Maroc',
    importance: 'important',
    dateDebut: new Date('2026-05-09 14:00'),
    dateFin: new Date('2026-05-09 15:30'),
    lieu: 'Casablanca - Technopark'
  },
  {
    titre: 'Reportage terrain - Quartier populaire',
    categorie: 'Société',
    resume: 'Conditions de vie et témoignages des habitants',
    importance: 'normale',
    dateDebut: new Date('2026-05-10 09:00'),
    dateFin: new Date('2026-05-10 13:00'),
    lieu: 'Casablanca'
  },
  {
    titre: 'Couverture événement sportif',
    categorie: 'Sport',
    resume: 'Match de championnat et interviews joueurs',
    importance: 'normale',
    dateDebut: new Date('2026-05-11 18:00'),
    dateFin: new Date('2026-05-11 22:00'),
    lieu: 'Stade Mohammed V'
  },
  {
    titre: 'Conférence internationale média',
    categorie: 'Média',
    resume: 'Transformation digitale du journalisme',
    importance: 'important',
    dateDebut: new Date('2026-05-12 09:30'),
    dateFin: new Date('2026-05-12 17:00'),
    lieu: 'Marrakech'
  },
  {
    titre: 'Rédaction article d’enquête',
    categorie: 'Travail',
    resume: 'Finalisation d’un dossier sur la corruption',
    importance: 'important',
    dateDebut: new Date('2026-05-13 11:00'),
    dateFin: new Date('2026-05-13 16:00'),
    lieu: 'Rédaction'
  },
  {
    titre: 'Conférence culturelle',
    categorie: 'Culture',
    resume: 'Couverture d’un festival artistique',
    importance: 'normale',
    dateDebut: new Date('2026-05-14 19:00'),
    dateFin: new Date('2026-05-14 22:30'),
    lieu: 'Théâtre municipal'
  }
];

  }

  get filteredEvents() {
  return this.events.filter(event => {
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
}