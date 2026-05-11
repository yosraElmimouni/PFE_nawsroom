import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalService } from '@azure/msal-angular';

import {
  MSALInstanceFactory,
  MSALGuardConfigFactory,
  MSALInterceptorConfigFactory,
} from './auth/msal.config';

export function initializeMsal(msalService: MsalService) {
  return () => msalService.instance.initialize();
}

@NgModule({
  imports: [
    HttpClientModule,
    MsalModule.forRoot(
      MSALInstanceFactory(),
      MSALGuardConfigFactory(),
      MSALInterceptorConfigFactory()
    ),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeMsal,
      deps: [MsalService],
      multi: true,
    },
  ],
})
export class CoreModule {}