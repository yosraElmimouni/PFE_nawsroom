import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { Observable, from, switchMap } from "rxjs";
import { Article } from "../editor-dashboard/editor-dashboard.page";

@Injectable({
  providedIn: 'root',
})
export class ServiceDashJournaliste {
  // private apiUrl = 'http://localhost:10000/article';
  private apiUrl = 'https://newsroom-ai-api-u0vt.onrender.com/article';


  constructor(private http: HttpClient, private msalService: MsalService ) {}

  
//   private async getHeaders() {
//   // 1. Essayer de récupérer le compte actif
//   let activeAccount = this.msalService.instance.getActiveAccount();

//   // 2. Si null, essayer de récupérer le premier compte du cache
//   if (!activeAccount) {
//     const accounts = this.msalService.instance.getAllAccounts();
//     if (accounts.length > 0) {
//       activeAccount = accounts[0];
//       // On le définit comme actif pour les prochaines fois
//       this.msalService.instance.setActiveAccount(activeAccount);
//     }
//   }

//   // 3. Si toujours rien, alors l'utilisateur n'est vraiment pas connecté
//   if (!activeAccount) {
//     throw new Error("Utilisateur non connecté");
//   }

//   try {
//     const result = await this.msalService.instance.acquireTokenSilent({
//       scopes: ['User.Read'],
//       account: activeAccount
//     });

//     return {
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${result.accessToken}`,
//       }),
//     };
//   } catch (error) {
//     console.error("Erreur lors de la récupération silencieuse du token", error);
//     // Optionnel : Si le token silencieux échoue (ex: expiré), on peut forcer un login
//     // this.msalService.loginRedirect(); 
//     throw error;
//   }
// }

  getArticleByStatus(statut: string): Observable<Article[]> {
    // Utilisation de 'from' pour convertir la Promise en Observable
    // puis 'switchMap' pour passer aux données de l'API
    return this.http.get<Article[]>(`${this.apiUrl}/status/${statut}` );
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article )
      
  }

  getArticleCountByStatus(statut: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/status/${statut}` )
      
  }
}
