import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Gemini {
  private apikey = '';
  private apiurl = '';

  constructor(private http:HttpClient){}

  sendMessage(message: string){
    const body = {
      contents: [
        {
          parts: [{text:message}]
        }
      ]
    }
    return this.http.post(this.apiurl,body)
  }
}