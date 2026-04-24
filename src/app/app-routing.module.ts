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
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'editor-dashboard',
    loadChildren: () => import('./editor-dashboard/editor-dashboard.module').then( m => m.EditorDashboardPageModule)
  },
 
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  
  {
    path: 'articles',
    loadChildren: () => import('./articles-list/articles-list.module').then( m => m.ArticlesListPageModule)
  },
  
  {
    path: 'redaction',
    loadChildren: () => import('./redaction/redaction.module').then( m => m.RedactionPageModule)
  },
  {
    path: 'capture',
    loadChildren: () => import('./capture/capture.module').then( m => m.CapturePageModule)
  },
  {
    path: 'article-detail',
    loadChildren: () => import('./article-detail/article-detail.module').then( m => m.ArticleDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
