import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard-journaliste/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'editor-dashboard',
    loadChildren: () => import('./features/dashboard/editor-dashboard/editor-dashboard.module').then( m => m.EditorDashboardPageModule)
  },
 
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./features/dashboard/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  
  {
    path: 'articles',
    loadChildren: () => import('./features/articles/articles-list/articles-list.module').then( m => m.ArticlesListPageModule)
  },
  
  {
    path: 'redaction',
    loadChildren: () => import('./features/articles/add-article/redaction.module').then( m => m.RedactionPageModule)
  },
  {
    path: 'capture',
    loadChildren: () => import('./capture/capture.module').then( m => m.CapturePageModule)
  },
  {
    path: 'article-detail/:id',
    loadChildren: () => import('./features/articles/article-detail/article-detail.module').then( m => m.ArticleDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
