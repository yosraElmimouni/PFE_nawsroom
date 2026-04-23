import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedactionPageRoutingModule } from './redaction-routing.module';

import { RedactionPage } from './redaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedactionPageRoutingModule
  ],
  declarations: [RedactionPage]
})
export class RedactionPageModule {}
