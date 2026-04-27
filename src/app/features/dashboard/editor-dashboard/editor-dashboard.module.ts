import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorDashboardPageRoutingModule } from './editor-dashboard-routing.module';

import { EditorDashboardPage } from './editor-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorDashboardPageRoutingModule
  ],
  declarations: [EditorDashboardPage]
})
export class EditorDashboardPageModule {}
