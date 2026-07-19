import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
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
    path: 'redaction/:id',
    loadChildren: () => import('./features/articles/add-article/redaction.module').then( m => m.RedactionPageModule)
  },
  {
    path: 'article-detail/:id',
    loadChildren: () => import('./features/articles/article-detail/article-detail.module').then( m => m.ArticleDetailPageModule)
  },
  {
    path:'veille',
    loadChildren: ()=>  import('./features/veille-info/veille-info.module').then( m => m.VeilleInfoPageModule)
  },
  
  {
    path:'capture',
    loadChildren: () => import('./features/capture/capture.module').then(m => m.CapturePageModule)
  },
  {
    path: 'ai-assistant',
    loadChildren: () => import('./features/ai-assistant/ai-assistant.module').then( m => m.AiAssistantPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./features/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./features/profile/profile.module').then( m => m.ProfilePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
