import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeilleInfoPage } from './veille-info.page';

const routes: Routes = [
  {
    path: '',
    component: VeilleInfoPage
  },
  {
    path: 'detaille-actualite/:id',
    loadChildren: () => import('./detaille-actualite/detaille-actualite.module').then( m => m.DetailleActualitePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeilleInfoPageRoutingModule {}
