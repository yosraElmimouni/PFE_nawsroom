import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module')
            .then(m => m.DashboardPageModule)
      },
      {
        path: 'editor-dashboard',
        loadChildren: () =>
          import('../editor-dashboard/editor-dashboard.module')
            .then(m => m.EditorDashboardPageModule)
      },
      {
        path: 'admin-dashboard',
        loadChildren: () =>
          import('../admin-dashboard/admin-dashboard.module')
            .then(m => m.AdminDashboardPageModule)
      },
      {
        path: 'articles-list',
        loadChildren: () =>
          import('../articles-list/articles-list.module')
            .then(m => m.ArticlesListPageModule)
      },
       {
        path: 'form-ajout-article',
        loadChildren: () => import('../form-ajout-article/form-ajout-article.module').then( m => m.FormAjoutArticlePageModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}