import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { MsalModule, MsalService } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },MsalService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function MSALInstanceFactory() {
  return new PublicClientApplication({
    auth: {
      clientId: 'TON_CLIENT_ID',
      authority: 'https://login.microsoftonline.com/TON_TENANT_ID',
      redirectUri: 'http://localhost:8100'
    }
  });
}