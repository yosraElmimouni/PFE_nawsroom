import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { InteractionType } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { Capacitor } from '@capacitor/core';
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
  const isNative = Capacitor.isNativePlatform();
  return new PublicClientApplication({
    auth: {
      clientId: 'f5515d18-8765-4ae6-8b08-2b4b8ad66611',
      authority: 'https://login.microsoftonline.com/dc59e38c-4977-406f-bdd1-9ebbabbd387e',
      // redirectUri: isNative
      //         ? 'http://localhost:8100'
      //         : 'msauth://ma.ac.usms.newsroom/auth',
      //         }
      
 redirectUri: 'http://localhost:8100',
      postLogoutRedirectUri: 'http://localhost:8100',
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


