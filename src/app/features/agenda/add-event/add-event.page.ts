import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Agenda } from 'src/app/core/models/Agenda.model';
import { ServiceAgenda } from '../service-agenda';
import * as L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


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
  isDataLoaded = false;
  event: any = {
    titre: '',
    categorie: '',
    resume: '',
    importance: 'normale',
    dateDebut: '',
    dateFin: '',
    lieu: '',
  };
  lieuQuery: string = '';
suggestions: any[] = [];
showSuggestions: boolean = false;
isSearching: boolean = false;
mapVisible: boolean = false;

private map: L.Map | null = null;
private marker: L.Marker | null = null;
private searchTimeout: any;
  activeCalendar: 'debut' | 'fin' | null = null;
  categories: string[] = [
    'Politique',
    'Économie',
    'Société',
    'Sport',
    'Culture',
  ];
  events: Agenda[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private agendaService: ServiceAgenda,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.loadEventData();
  }

  ionViewWillEnter() {
    this.loadEventData();
  }

  loadEventData() {
  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.isEditMode = true;
    this.eventId = +idParam;
    this.agendaService.getAgendaById(this.eventId).subscribe({
      next: (existing) => {
        if (existing) {
          this.event = { ...existing };
          if (this.event.dateDebut) {
            this.event.dateDebut = new Date(this.event.dateDebut).toISOString();
          }
          if (this.event.dateFin) {
            this.event.dateFin = new Date(this.event.dateFin).toISOString();
          }
        }
      },
    });
  } else {
    const now = new Date().toISOString();
    this.event.dateDebut = now;
    this.event.dateFin = now;
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
    return this.event.dateDebut || '';
  }
  set dateDebutISO(value: string) {
    this.event.dateDebut = value;
  }

  set dateFinISO(value: string) {
    this.event.dateFin = value;
  }

  get dateFinISO(): string {
    return this.event.dateFin || '';
  }

  // set dateFinISO(value: string) {
  //   this.event.dateFin = new Date(value);
  // }

  async getLocation() {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;

          const longitude = position.coords.longitude;

          console.log(latitude, longitude);

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();

          this.locationText = data.display_name;

          this.event.lieu = this.locationText;

          console.log(this.locationText);
        },

        (error) => {
          console.error(error);
        },
      );
    } catch (error) {
      console.error('LOCATION ERROR : ', error);
    }
  }

  async submitAgenda() {
  console.log('EVENT ENVOYÉ : ', this.event);
  
  const request = this.isEditMode
    ? this.agendaService.updateAgenda(this.event.id, this.event)
    : this.agendaService.createAgenda(this.event);

  request.subscribe({
    next: async (response) => {
      console.log(response);
      
      const toast = await this.toastCtrl.create({
        message: this.isEditMode
          ? 'Événement modifié avec succès !'
          : 'Événement ajouté avec succès !',
        duration: 2500,
        position: 'bottom',
        color: 'success',
      });
      await toast.present();

      this.router.navigate(['/agenda']);
    },
    error: async (error) => {
      console.log(error);
      
      const toast = await this.toastCtrl.create({
        message: 'Une erreur est survenue, veuillez réessayer.',
        duration: 2500,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    },
  });
}

  testDate(event: any) {
    console.log('DATE CHANGÉE : ', event.detail.value);
  }

  onDateChange(event: any, field: string) {
    this.event[field] = event.detail.value;
    this.cd.detectChanges();
  }
  getButtonText(): string {
    return this.isEditMode
      ? 'Enregistrer les modifications'
      : 'Ajouter événement';
  }


toggleCalendar(type: 'debut' | 'fin') {
  this.activeCalendar = this.activeCalendar === type ? null : type;
}

onCalendarChange() {
  this.activeCalendar = null;
}

// Lieu


onLieuSearch() {
  clearTimeout(this.searchTimeout);
  if (this.lieuQuery.length < 3) {
    this.suggestions = [];
    return;
  }
  this.isSearching = true;
  this.searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.lieuQuery)}&limit=5&addressdetails=1`,
        { headers: { 'Accept-Language': 'fr' } }
      );
      this.suggestions = await res.json();
    } catch (e) {
      this.suggestions = [];
    } finally {
      this.isSearching = false;
    }
  }, 400);
}

selectSuggestion(s: any) {
  this.lieuQuery = s.display_name;
  this.event.lieu = s.display_name;
  this.suggestions = [];
  this.showSuggestions = false;
  this.mapVisible = true;

  const lat = parseFloat(s.lat);
  const lon = parseFloat(s.lon);

  setTimeout(() => this.initMap(lat, lon), 100);
}

initMap(lat: number, lon: number) {
  if (this.map) {
    this.map.setView([lat, lon], 14);
    if (this.marker) {
      this.marker.setLatLng([lat, lon]);
    }
    return;
  }

  this.map = L.map('lieu-map', { zoomControl: true }).setView([lat, lon], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(this.map);

  this.marker = L.marker([lat, lon], { draggable: true }).addTo(this.map);

  // Mise à jour du lieu quand on déplace le marker
  this.marker.on('dragend', async (e) => {
    const pos = (e.target as L.Marker).getLatLng();
    await this.reverseGeocode(pos.lat, pos.lng);
  });

  // Clic sur la carte pour déplacer le marker
  this.map.on('click', async (e: L.LeafletMouseEvent) => {
    this.marker?.setLatLng(e.latlng);
    await this.reverseGeocode(e.latlng.lat, e.latlng.lng);
  });
}

async reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: { 'Accept-Language': 'fr' } }
    );
    const data = await res.json();
    this.event.lieu = data.display_name;
    this.lieuQuery = data.display_name;
    this.cd.detectChanges();
  } catch (e) {
    console.error('Reverse geocode error', e);
  }
}

clearLieu() {
  this.lieuQuery = '';
  this.event.lieu = '';
  this.suggestions = [];
  this.mapVisible = false;
  if (this.map) {
    this.map.remove();
    this.map = null;
    this.marker = null;
  }
}

ngOnDestroy() {
  if (this.map) {
    this.map.remove();
  }
}
}
