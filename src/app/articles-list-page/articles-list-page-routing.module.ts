import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesListPagePage } from './articles-list-page.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesListPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesListPagePageRoutingModule {}
