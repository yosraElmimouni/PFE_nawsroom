import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user = {
    nom: '',
    prenom: '',
    email: '',
    role: '',
    photo: '',
    initiales: '',
  };

  constructor(
    private router: Router,
    private msalService: MsalService,
  ) {}

  ngOnInit() {
    this.loadUserFromMsal();
  }

  loadUserFromMsal() {
    // 1. Essayer depuis le compte MSAL actif
    const account = this.msalService.instance.getActiveAccount()
      || this.msalService.instance.getAllAccounts()[0];

    if (account) {
      const claims: any = account.idTokenClaims || {};

      
      this.user.prenom  = claims.given_name  || account.name?.split(' ')[0] || '';
      this.user.nom     = claims.family_name || account.name?.split(' ').slice(1).join(' ') || '';
      this.user.email   = account.username   || claims.email || '';
      this.user.role    = claims.roles?.[0]  || claims.jobTitle || 'Utilisateur';
      this.user.initiales = this.buildInitiales(this.user.prenom, this.user.nom);
      return;
    }

    // 2. Fallback : localStorage (profil Graph stocké dans app.component)
    const stored = localStorage.getItem('user');
    if (stored) {
      const data = JSON.parse(stored);
      this.user.prenom    = data.givenName    || data.given_name    || '';
      this.user.nom       = data.surname      || data.family_name   || '';
      this.user.email     = data.mail         || data.userPrincipalName || data.username || '';
      this.user.role      = data.jobTitle     || data.role          || 'Utilisateur';
      this.user.initiales = this.buildInitiales(this.user.prenom, this.user.nom);
    }
  }

  buildInitiales(prenom: string, nom: string): string {
    return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  }

  logout() {
    localStorage.clear();
    if (Capacitor.isNativePlatform()) {
      this.router.navigate(['/login']);
    } else {
      this.msalService.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,
      });
    }
  }
}