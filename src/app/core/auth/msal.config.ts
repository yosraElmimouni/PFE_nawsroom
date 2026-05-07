import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import { Capacitor } from '@capacitor/core';
import { environment } from '../../../environments/environment';

export function MSALInstanceFactory() {
  const isNative = Capacitor.isNativePlatform();

  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.clientId,
      authority: environment.msal.authority,
      redirectUri: isNative
        ? environment.msal.nativeRedirectUri
        : environment.msal.webRedirectUri,
    },
    cache: {
      cacheLocation: 'localStorage',
    },
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['openid', 'profile', 'email'],
    },
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map(),
  };
}
