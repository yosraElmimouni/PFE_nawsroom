import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { InteractionType } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import {
  MsalModule,
  MsalService,
  MSAL_INSTANCE
} from '@azure/msal-angular';

import {
  IPublicClientApplication,
  PublicClientApplication
} from '@azure/msal-browser';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '46c7fb9e-0894-4a47-a46d-103f499f7fbd',
      authority: 'https://login.microsoftonline.com/dc59e38c-4977-406f-bdd1-9ebbabbd387e',
      redirectUri: window.location.origin,
    }
  });
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,

    MsalModule.forRoot(
      MSALInstanceFactory(),
      MSALGuardConfigFactory(),
      MSALInterceptorConfigFactory()
    )
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsal,
      deps: [MsalService],
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MsalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initializeMsal(msalService: MsalService) {
  return () => msalService.instance.initialize();
}
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['openid', 'profile', 'email']
    }
  };
}


export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map()
  };
}


