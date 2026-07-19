import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/core/models/media.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceCapture {
  private apiUrl = 'https://newsroom-ai-api-u0vt.onrender.com/media';
  // private apiUrl = 'http://localhost:10000/media';

  constructor(
    private http: HttpClient
  ) {}

  getMedias(): Observable<Media[]> {

    return this.http.get<Media[]>(this.apiUrl);
  }

  getMediaById(id: number): Observable<Media> {

    return this.http.get<Media>(`${this.apiUrl}/${id}`);
  }

  createMedia(Media: Media): Observable<Media> {

    return this.http.post<Media>(this.apiUrl, Media);
  }

  updateMedia(id: number, Media: Media): Observable<Media> {

    return this.http.patch<Media>(
      `${this.apiUrl}/${id}`,
      Media
    );
  }

  deleteMedia(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
