import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleDetailPage } from './article-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ArticleDetailPage
  },
  {
    path: 'medias',
    loadChildren: () => import('./medias/medias.module').then( m => m.MediasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleDetailPageRoutingModule {}
