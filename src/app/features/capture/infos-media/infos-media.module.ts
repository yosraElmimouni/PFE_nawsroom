import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfosMediaPageRoutingModule } from './infos-media-routing.module';

import { InfosMediaPage } from './infos-media.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfosMediaPageRoutingModule
  ],
  declarations: [InfosMediaPage]
})
export class InfosMediaPageModule {}
