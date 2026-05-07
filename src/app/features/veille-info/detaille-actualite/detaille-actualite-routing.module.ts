import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailleActualitePage } from './detaille-actualite.page';

const routes: Routes = [
  {
    path: '',
    component: DetailleActualitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailleActualitePageRoutingModule {}
