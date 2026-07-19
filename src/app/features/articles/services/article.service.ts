import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {  from, of, Observable } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

import { Article } from 'src/app/core/models/article.model';
import { Media } from 'src/app/core/models/media.model';
import { SqliteService } from 'src/app/core/services/sqlite.service';
import { NetworkService } from 'src/app/core/services/network.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'https://newsroom-ai-api-u0vt.onrender.com/article';
  // private apiUrl = 'http://localhost:10000/article';

  constructor(
    private http: HttpClient,
    private network: NetworkService,
    private sqlite: SqliteService
  ) {}

  getArticles(): Observable<Article[]> {
    if (this.network.online$.value) {
      return this.http.get<Article[]>(this.apiUrl).pipe(
        tap(articles => this.sqlite.saveArticlesCache(articles)),
        catchError(() => from(this.sqlite.getArticlesLocal()))
      );
    }
    return from(this.sqlite.getArticlesLocal());
  }

  getArticleById(id: number): Observable<Article> {

    if (this.network.online$.value) {
      return this.http.get<Article>(`${this.apiUrl}/${id}`);
    }
    return from(this.sqlite.getArticlesLocal()).pipe(
      switchMap(articles => {
        const article = articles.find(a => a.id === id);
        if (article) {
          return of(article);
        } else {
          throw new Error('Article not found in local cache');
        }
      })
    );
  }
   

  createArticle(article: Article): Observable<Article> {
    if (this.network.online$.value) {
      return this.http.post<Article>(this.apiUrl, article);
    }
    const localId = 'local_' + Date.now();
    const now = new Date().toISOString();
    const localArticle: any = {
      ...article,
      id: null,
      local_id: localId,
      dateCreation: now,
      dateModification: now,
      synced: 0
    };
    return from(
      this.sqlite.addPendingOperation('article', 'create', localId, article)
        .then(() => this.sqlite.saveArticleLocal(localArticle))
        .then(() => localArticle)
    );
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    if (this.network.online$.value) {
      return this.http.patch<Article>(
        `${this.apiUrl}/${id}`,
        article
      );
    }
    const localId = 'local_' + Date.now();
    return from(
      this.sqlite.addPendingOperation('article', 'update', localId, article)
        .then(() => ({ ...article, id: -1, local_id: localId } as any))
    );
  }

  deleteArticle(id: number): Observable<void> {
    if (this.network.online$.value) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    const localId = 'local_' + Date.now();
    return from(
      this.sqlite.addPendingOperation('article', 'delete', localId, { id })
        .then(() => undefined)
    );
  }

    

  getMedias(id: number): Observable<Media[]> {
  return this.http.get<Media[]>(
    `http://localhost:10000/media/Article/${id}`
  );
}
}