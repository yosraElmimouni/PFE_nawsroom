import { Component, OnInit } from '@angular/core';
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

  ) { }

  ngOnInit() {
    this.msalService.instance.handleRedirectPromise()
  .catch(e => console.error(e));
  }

  roles = [
    { name: 'Journaliste', icon: 'create' },
    { name: 'Éditeur',     icon: 'checkmark' },
    { name: 'Admin',      icon: 'settings' }
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
    scopes: ['User.Read']
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
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:8100',
    });
  }

}
