import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { routes } from './app-routing.module';

import pkg from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  appVersion = '';
  user: any;
  activeModule: string = 'redaction';
  activeTab: 'progress' | 'published' | 'draft' = 'progress';

  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  modules = [
    { id:1, name: 'Redaction', icon: 'pencil' },
    { id:2, name: 'Collecte',  icon: 'camera' },
    { id:3, name: 'Veille',    icon: 'eye' },
    { id:4, name: 'Fusion',    icon: 'git-merge' },
    { id:5, name: 'Articles',  icon: 'newspaper' },
    { id:6, name: 'Profil',    icon: 'person' },

  ];
  async ngOnInit() {
    if (!Capacitor.isNativePlatform()) {
        this.msalService.instance
            .handleRedirectPromise()
            .then(result => {
              if (result?.account) {
                this.msalService.instance.setActiveAccount(result.account);
                localStorage.setItem('user', JSON.stringify(result.account));
                this.router.navigate(['/dashboard']);
              }
            })
            .catch(e => console.error('MSAL error:', e));
        }


    App.addListener('appUrlOpen', async (event: any) => {
      const url = event.url;
      console.log('appUrlOpen:', url);

      if (!url.startsWith('msauth://ma.ac.usms.newsroom/auth')) return;

      try { await Browser.close(); } catch (e) {}

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

      if (error) {
        console.error('Azure error:', error, errorDesc);
        return;
      }

      console.log('access_token:', accessToken ? 'reçu ' : 'absent');
      console.log('id_token:', idToken ? 'reçu ' : 'absent');
      console.log('code:', code ? 'reçu ' : 'absent');
      console.log('access_token:', accessToken ? 'reçu ' : 'absent');
      console.log('id_token:', idToken ? 'reçu ' : 'absent');
      console.log('code:', code ? 'reçu ' : 'absent');

      if (accessToken) localStorage.setItem('token', accessToken);
      if (idToken)     localStorage.setItem('id_token', idToken);
      if (code)        localStorage.setItem('auth_code', code);

      if (accessToken) {
        await this.fetchUserProfile(accessToken);
      }

      this.router.navigate(['/dashboard']);
    });
    const currentUrl = this.router.url;
    for (let m of this.modules) {
      if (currentUrl.includes(m.name.toLowerCase())) {
        this.activeModule = m.name.toLowerCase();
        return;
      }
      else {        
        this.activeModule = 'redaction';
      }
    }
    
if (Capacitor.isNativePlatform()) {
      const info = await App.getInfo();
      this.appVersion = info.version; // Android / iOS
    } else {
      this.appVersion = pkg.version;  // Web
    }

  
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
  navigateTo(module: string): void {
      this.activeModule = module;
        const path = routes.find(r => r.path === module)?.path;
        if (path) {
          this.router.navigate([`/${path.toLocaleLowerCase()}`]);
        } else {
          console.warn('No route found for module:', module);
        }
    }
}