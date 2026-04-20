import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  user: any;

  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  ngOnInit() {
    // ── Web : gérer le retour MSAL redirect
    if (!Capacitor.isNativePlatform()) {
      this.msalService.instance.handleRedirectPromise()
        .then(result => {
          if (result?.account) {
            this.msalService.instance.setActiveAccount(result.account);
            localStorage.setItem('user', JSON.stringify(result.account));
            this.router.navigate(['/dashboard']);
          }
        })
        .catch(e => console.error('MSAL error:', e));
    }

    // ── Mobile : intercepter le deep link msauth://
    App.addListener('appUrlOpen', async (event: any) => {
      const url = event.url;
      console.log('appUrlOpen:', url);

      if (!url.startsWith('msauth://ma.ac.usms.newsroom/auth')) return;

      // Fermer le navigateur externe
      try { await Browser.close(); } catch (e) {}

      // Le fragment peut être après # ou après ?
      const afterScheme = url.includes('#') ? url.split('#')[1] : url.split('?')[1];
      if (!afterScheme) {
        console.error('Aucun fragment dans le redirect URL');
        return;
      }

      const params = new URLSearchParams(afterScheme);

      const accessToken  = params.get('access_token');
      const idToken      = params.get('id_token');
      const code         = params.get('code');
      const error        = params.get('error');
      const errorDesc    = params.get('error_description');

      // Erreur retournée par Azure
      if (error) {
        console.error('Azure error:', error, errorDesc);
        return;
      }

      console.log('access_token:', accessToken ? 'reçu ✅' : 'absent');
      console.log('id_token:', idToken ? 'reçu ✅' : 'absent');
      console.log('code:', code ? 'reçu ✅' : 'absent');

      // Stocker ce qu'on a reçu
      if (accessToken) localStorage.setItem('token', accessToken);
      if (idToken)     localStorage.setItem('id_token', idToken);
      if (code)        localStorage.setItem('auth_code', code);

      // Récupérer le profil Microsoft Graph si on a un access_token
      if (accessToken) {
        await this.fetchUserProfile(accessToken);
      }

      // Naviguer vers le dashboard
      this.router.navigate(['/dashboard']);
    });
  }

  async fetchUserProfile(token: string) {
    try {
      const res = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const user = await res.json();
      console.log('Profil Microsoft:', user);
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    } catch (e) {
      console.error('Erreur profil Graph:', e);
    }
  }

  logout() {
    localStorage.clear();
    if (Capacitor.isNativePlatform()) {
      this.router.navigate(['/login']);
    } else {
      this.msalService.logoutRedirect({
        postLogoutRedirectUri: 'http://localhost:8100',
      });
    }
  }
}