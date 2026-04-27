import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesListPage } from './articles-list.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesListPageRoutingModule {}
