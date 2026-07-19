import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  constructor(
    private msalService: MsalService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      // Android : vérifie si token déjà stocké (session existante)
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.router.navigate(['/dashboard']);
        return; // ← stop ici, pas besoin de continuer
      }
    } else {
      // Web uniquement : handleRedirectPromise après retour MSAL
      this.msalService.instance
        .handleRedirectPromise()
        .then((result) => {
          if (result?.account) {
            this.msalService.instance.setActiveAccount(result.account);
            localStorage.setItem('user', JSON.stringify(result.account));
            this.router.navigate(['/dashboard']);
            return;
          }
          const accounts = this.msalService.instance.getAllAccounts();
          if (accounts.length > 0) {
            this.msalService.instance.setActiveAccount(accounts[0]);
            this.router.navigate(['/dashboard']);
          }
        })
        .catch((e) => console.error(e));
    }
  }

  roles = [
    { name: 'Journaliste', icon: 'create' },
    { name: 'Éditeur', icon: 'checkmark' },
    { name: 'Admin', icon: 'settings' },
  ];

  // login() {
  // if (Capacitor.isNativePlatform()) {
  //   this.loginMobile();
  // } else {
  //   this.loginWeb();
  // }
  // }
  login() {
    this.msalService.loginRedirect({
      scopes: ['User.Read'],
    });
  }

  // loginMobile() {
  //   const clientId = 'f5515d18-8765-4ae6-8b08-2b4b8ad66611';
  //   const tenantId = 'dc59e38c-4977-406f-bdd1-9ebbabbd387e';
  //   const redirectUri = encodeURIComponent('msauth://ma.ac.usms.newsroom/auth');

  //   const url =
  //     `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize` +
  //     `?client_id=${clientId}` +
  //     `&response_type=code` +
  //     `&redirect_uri=${redirectUri}` +
  //     `&scope=User.Read openid profile email` +
  //     `&response_mode=fragment`;

  //   Browser.open({ url });
  // }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  logout() {
    if (Capacitor.isNativePlatform()) {
      localStorage.clear();
      // pas de redirect, on reste sur login
    } else {
      this.msalService.logoutRedirect({
        postLogoutRedirectUri: 'http://localhost:8100',
      });
    }
  }
}
