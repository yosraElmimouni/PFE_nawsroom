import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Gemini {

  private apikey = 'AIzaSyDKwWTtDfq-eLfe7Ltai2Qn2y-FuYtiZfs';

  private apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=' + this.apikey;

  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    const body = {
      contents: [
        {
          parts: [{ text: message }]
        }
      ]
    };

    return this.http.post(this.apiUrl, body);
  }
}