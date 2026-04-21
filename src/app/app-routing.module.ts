import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

<<<<<<< Updated upstream
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
=======
export const routes: Routes = [
  
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  {
    path: 'editor-dashboard',
    loadChildren: () => import('./editor-dashboard/editor-dashboard.module').then( m => m.EditorDashboardPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  
  {
    path: 'articles-list',
    loadChildren: () => import('./articles-list/articles-list.module').then( m => m.ArticlesListPageModule)
  },
  {
    path: 'form-ajout-article',
    loadChildren: () => import('./form-ajout-article/form-ajout-article.module').then( m => m.FormAjoutArticlePageModule)
  },
>>>>>>> Stashed changes
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
