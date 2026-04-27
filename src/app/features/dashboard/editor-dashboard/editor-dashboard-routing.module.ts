import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorDashboardPage } from './editor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: EditorDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorDashboardPageRoutingModule {}
