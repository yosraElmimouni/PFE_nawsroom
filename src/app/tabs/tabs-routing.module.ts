import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
  {
    path: 'dashboard',
    loadChildren: () => import('./../dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'editor-dashboard',
    loadChildren: () => import('./../editor-dashboard/editor-dashboard.module').then( m => m.EditorDashboardPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./../tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./../admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  
  {
    path: 'articles-list',
    loadChildren: () => import('./../articles-list/articles-list.module').then( m => m.ArticlesListPageModule)
  },
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
