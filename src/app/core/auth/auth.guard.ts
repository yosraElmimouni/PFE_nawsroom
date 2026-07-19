import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private msalService: MsalService,
    private router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      // Android : le token arrive via appUrlOpen, on vérifie localStorage
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      // Web : flux MSAL standard
      await this.msalService.instance.handleRedirectPromise();
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.msalService.instance.setActiveAccount(accounts[0]);
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
  }
}
