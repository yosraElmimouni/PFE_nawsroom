import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(
    private msalService: MsalService,

  ) { }

  ngOnInit() {
  }

  roles = [
    { name: 'Journaliste', icon: 'create' },
    { name: 'Éditeur',     icon: 'checkmark' },
    { name: 'Admin',      icon: 'settings' }
  ];

  login() {
    this.msalService.loginRedirect({
      scopes: ['User.Read'],
      redirectStartPage: '/dashboard',
    });
  }
  
  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  logout() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: '/login',
    });
  }

}
