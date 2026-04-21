import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlesListPagePageRoutingModule } from './articles-list-page-routing.module';

import { ArticlesListPagePage } from './articles-list-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesListPagePageRoutingModule
  ],
  declarations: [ArticlesListPagePage]
})
export class ArticlesListPagePageModule {}
