import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventAgenda } from 'src/app/core/models/EventAgenda.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
  standalone: false,
})
export class AddEventPage implements OnInit {
  isEditMode: boolean = false;
  eventId: number | null = null;
  locationText: string = '';
  event: any = {
    titre: '',
    categorie: '',
    resume: '',
    importance: 'normale',
    dateDebut: '',
    dateFin: '',
    lieu: '',
  };

  categories: string[] = [
    'Politique',
    'Économie',
    'Société',
    'Sport',
    'Culture',
  ];
  events: EventAgenda[] = [
    {
      id: 1,
      titre: 'Conférence de presse Ministère',
      categorie: 'Politique',
      resume: 'Annonce officielle des nouvelles réformes',
      importance: 'important',
      dateDebut: new Date('2026-05-08'),
      dateFin: new Date('2026-05-09'),
      lieu: 'Rabat',
    },
    {
      id: 2,
      titre: 'Interview exclusive PDG startup',
      categorie: 'Économie',
      resume: 'Discussion sur l’innovation technologique au Maroc',
      importance: 'important',
      dateDebut: new Date('2026-05-09'),
      dateFin: new Date('2026-05-10'),
      lieu: 'Casablanca - Technopark',
    },
    {
      id: 3,
      titre: 'Reportage terrain - Quartier populaire',
      categorie: 'Société',
      resume: 'Conditions de vie et témoignages des habitants',
      importance: 'normale',
      dateDebut: new Date('2026-05-10'),
      dateFin: new Date('2026-05-11'),
      lieu: 'Casablanca',
    },
    {
      id: 4,
      titre: 'Couverture événement sportif',
      categorie: 'Sport',
      resume: 'Match de championnat et interviews joueurs',
      importance: 'normale',
      dateDebut: new Date('2026-05-11'),
      dateFin: new Date('2026-05-12'),
      lieu: 'Stade Mohammed V',
    },
    {
      id: 5,
      titre: 'Conférence internationale média',
      categorie: 'Média',
      resume: 'Transformation digitale du journalisme',
      importance: 'important',
      dateDebut: new Date('2026-05-12'),
      dateFin: new Date('2026-05-13'),
      lieu: 'Marrakech',
    },
    {
      id: 6,
      titre: 'Rédaction article d’enquête',
      categorie: 'Travail',
      resume: 'Finalisation d’un dossier sur la corruption',
      importance: 'important',
      dateDebut: new Date('2026-05-13'),
      dateFin: new Date('2026-05-14'),
      lieu: 'Rédaction',
    },
    {
      id: 7,
      titre: 'Conférence culturelle',
      categorie: 'Culture',
      resume: 'Couverture d’un festival artistique',
      importance: 'normale',
      dateDebut: new Date('2026-05-14'),
      dateFin: new Date('2026-05-20'),
      lieu: 'Théâtre municipal',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
  ) {}

  ngOnInit() {
    // Récupère l'id depuis l'URL si présent
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.isEditMode = true;
      this.eventId = +idParam; // convertit string → number

      // Charge l'événement existant
      const existing = this.events.find((e) => e.id === this.eventId);
      if (existing) {
        this.event = { ...existing }; // copie pour éviter mutation directe
      }
    }
    if (!this.event.lieu) {
  this.event.lieu = this.locationText;
}
    
  }

  addEvent() {
    if (!this.event.dateDebut || !this.event.dateFin) {
      console.log('Veuillez sélectionner les dates');
      return;
    }

    console.log('Event ajouté : ', this.event);

    this.navCtrl.back();
  }
  get dateDebutISO(): string {
    if (this.event.dateDebut instanceof Date) {
      const d = this.event.dateDebut;
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
    return this.event.dateDebut ?? '';
  }

  set dateDebutISO(value: string) {
    this.event.dateDebut = new Date(value);
  }

  get dateFinISO(): string {
    if (this.event.dateFin instanceof Date) {
      const d = this.event.dateFin;
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
    return this.event.dateFin ?? '';
  }

  set dateFinISO(value: string) {
    this.event.dateFin = new Date(value);
  }

  async getLocation() {

  try {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        console.log(latitude, longitude);

        const response = await fetch(

          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.json();

      this.locationText =
  data.display_name;

this.event.lieu =
  this.locationText;

console.log(this.locationText);
      },

      (error) => {

        console.error(error);
      }
    );

  } catch (error) {

    console.error(
      'LOCATION ERROR : ',
      error
    );
  }
}
}
