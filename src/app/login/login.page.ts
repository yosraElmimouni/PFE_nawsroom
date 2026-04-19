import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  roles = [
    { name: 'Journaliste', icon: 'create' },
    { name: 'Éditeur',     icon: 'checkmark' },
    { name: 'Admin',      icon: 'settings' }
  ];

  

}
