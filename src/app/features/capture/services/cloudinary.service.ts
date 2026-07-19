import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudName = environment.CLOUD_NAME;
  private uploadPreset = 'newsroom_upload';

  constructor(private http: HttpClient) {}

  async uploadMedia(file: File): Promise<any> {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/auto/upload`;

    return await lastValueFrom(this.http.post(url, formData));
  }
}