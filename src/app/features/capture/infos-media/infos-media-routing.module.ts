import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfosMediaPage } from './infos-media.page';

const routes: Routes = [
  {
    path: '',
    component: InfosMediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfosMediaPageRoutingModule {}
