import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsItem } from 'src/app/core/models/NewsItem.model';
import { NetworkService } from 'src/app/core/services/network.service';
import { SqliteService } from 'src/app/core/services/sqlite.service';

import {  from, of, Observable } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceVeille {
  private apiUrl = 'https://newsroom-ai-api-u0vt.onrender.com/news-item';
  // private apiUrl = 'http://localhost:10000/news-item';

  constructor(
    private http: HttpClient,
    private network: NetworkService,
    private sqlite: SqliteService
  ) {}

  

  getNewsItems(): Observable<NewsItem[]> {
   if (this.network.online$.value) {
         return this.http.get<NewsItem[]>(this.apiUrl).pipe(
           tap(newsItems => this.sqlite.saveNewsItemsCache(newsItems)),
           catchError(() => from(this.sqlite.getNewsItemsLocal()))
         );
       }
       return from(this.sqlite.getNewsItemsLocal());
     }


  getNewsItemById(id: number): Observable<NewsItem> {
    if (this.network.online$.value) {
      return this.http.get<NewsItem>(`${this.apiUrl}/${id}`);
    }
    return from(this.sqlite.getNewsItemsLocal()).pipe(
      switchMap(newsItems => {
        const newsItem = newsItems.find(n => n.id === id);
        if (newsItem) {
          return of(newsItem);
        } else {
          throw new Error('NewsItem not found in local cache');
        }
      })
    );
  }
   
  createNewsItem(NewsItem: NewsItem): Observable<NewsItem> {
    if (this.network.online$.value) {
      return this.http.post<NewsItem>(this.apiUrl, NewsItem);
    }
    const localId = 'local_' + Date.now();
    const now = new Date().toISOString();
    const localNewsItem: any = {
      ...NewsItem,
      id: null,
      local_id: localId,
      dateModification: now,
      synced: 0,
    };
    this.sqlite.saveNewsItemLocal(localNewsItem);
    this.sqlite.addPendingOperation('news-item', 'create', localId, JSON.stringify(localNewsItem));
    return of(localNewsItem);
  }

  updateNewsItem(id: number, NewsItem: NewsItem): Observable<NewsItem> {
    if (this.network.online$.value) {
      return this.http.patch<NewsItem>(`${this.apiUrl}/${id}`, NewsItem);
    }
    const now = new Date().toISOString();
    const localNewsItem: any = {
      ...NewsItem,
      dateModification: now,
      synced: 0,
    };
    this.sqlite.saveNewsItemLocal(localNewsItem);
    this.sqlite.addPendingOperation('news-item', 'update', id.toString(), JSON.stringify(localNewsItem));
    return of(localNewsItem);
  }


  deleteNewsItem(id: number): Observable<void> {
    if (this.network.online$.value) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    this.sqlite.removeNewsItemLocalByLocalId(id.toString());
    this.sqlite.addPendingOperation('news-item', 'delete', id.toString(), JSON.stringify({ id }));
    return of(undefined);
  }
    

}
