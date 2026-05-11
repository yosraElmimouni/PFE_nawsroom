import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone:false
})
export class DetailPage implements OnInit {

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


  constructor(
  private navCtrl: NavController,
  private router: Router
) {}

  ngOnInit() {

  const navigation =
    this.router.getCurrentNavigation();

  if (
    navigation?.extras?.state
  ) {

    this.event =
      navigation.extras.state['event'];

    console.log(this.event);
  }
  
}

 addEvent() {

  if (!this.event.dateDebut || !this.event.dateFin) {
    console.log("Veuillez sélectionner les dates");
    return;
  }

  console.log('Event ajouté : ', this.event);

  this.navCtrl.back();
}

modifierEvent() {
  if (!this.event?.id) {
    console.warn('ID événement manquant');
    return;
  }
  this.router.navigate(['/agenda/add-event', this.event.id]);
}
}
