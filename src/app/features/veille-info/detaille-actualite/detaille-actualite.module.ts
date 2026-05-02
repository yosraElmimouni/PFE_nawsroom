import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailleActualitePageRoutingModule } from './detaille-actualite-routing.module';

import { DetailleActualitePage } from './detaille-actualite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailleActualitePageRoutingModule
  ],
  declarations: [DetailleActualitePage]
})
export class DetailleActualitePageModule {}
