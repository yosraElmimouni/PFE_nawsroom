import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { SqliteService } from './core/services/sqlite.service';
import { NetworkService } from './core/services/network.service';

function initApp(sqlite: SqliteService, network: NetworkService) {
  return async () => {
    await sqlite.init();
    await network.init();
  };
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MarkdownModule.forRoot(),
    CoreModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [SqliteService, NetworkService],
      multi: true,
    },
      { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}