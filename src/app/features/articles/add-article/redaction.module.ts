import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedactionPageRoutingModule } from './redaction-routing.module';

import { AddArticlePage } from './add-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedactionPageRoutingModule
  ],
  declarations: [AddArticlePage]
})
export class RedactionPageModule {}
