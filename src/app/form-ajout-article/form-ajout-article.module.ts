import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAjoutArticlePageRoutingModule } from './form-ajout-article-routing.module';

import { FormAjoutArticlePage } from './form-ajout-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormAjoutArticlePageRoutingModule
  ],
  declarations: [FormAjoutArticlePage]
})
export class FormAjoutArticlePageModule {}
