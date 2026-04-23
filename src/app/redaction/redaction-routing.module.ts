import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedactionPage } from './redaction.page';

const routes: Routes = [
  {
    path: '',
    component: RedactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedactionPageRoutingModule {}
