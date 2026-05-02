import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeilleInfoPageRoutingModule } from './veille-info-routing.module';

import { VeilleInfoPage } from './veille-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeilleInfoPageRoutingModule
  ],
  declarations: [VeilleInfoPage],
  
})
export class VeilleInfoPageModule {}
