import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturePage } from './capture.page';

const routes: Routes = [
  {
    path: '',
    component: CapturePage
  },
  {
    path: 'infos-media/:name',
    loadChildren: () => import('./infos-media/infos-media.module').then( m => m.InfosMediaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturePageRoutingModule {}
