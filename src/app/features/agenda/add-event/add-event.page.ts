import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EventAgenda } from 'src/app/core/models/EventAgenda.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
  standalone: false,
})
export class AddEventPage implements OnInit {

  event: any = {
  titre: '',
  categorie: '',
  resume: '',
  importance: 'normale',
  dateDebut: '',   
  dateFin: '',     
  lieu: ''
};

  categories: string[] = [
  'Politique',
  'Économie',
  'Société',
  'Sport',
  'Culture'
];


  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

 addEvent() {

  if (!this.event.dateDebut || !this.event.dateFin) {
    console.log("Veuillez sélectionner les dates");
    return;
  }

  console.log('Event ajouté : ', this.event);

  this.navCtrl.back();
}



}