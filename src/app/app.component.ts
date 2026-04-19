import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  user:any;
  constructor(private msalSerice:MsalService,private router:Router,
 ) {}

 ngOnInit(): void {
  
  this.msalSerice.instance
    .handleRedirectPromise()
    .then(result => {
      if (result?.account) {
        this.msalSerice.instance.setActiveAccount(result.account);
        this.router.navigate(['/dashboard']);
      }
    });
    const compte=this.msalSerice.instance.getActiveAccount();
    if(compte){
      this.user=compte.idTokenClaims;
    }
  }

  logout() {
  this.msalSerice.logoutRedirect({
    postLogoutRedirectUri: window.location.origin,
  });
}
 
}
