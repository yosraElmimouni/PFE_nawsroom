import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAjoutArticlePage } from './form-ajout-article.page';

const routes: Routes = [
  {
    path: '',
    component: FormAjoutArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAjoutArticlePageRoutingModule {}
