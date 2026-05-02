import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardJournalistePage } from './dashboard-journaliste.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardJournalistePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
