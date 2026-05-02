import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlesListPageRoutingModule } from './articles-list-routing.module';

import { ArticlesListPage } from './articles-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlesListPageRoutingModule
  ],
  declarations: [ArticlesListPage]
})
export class ArticlesListPageModule {}
