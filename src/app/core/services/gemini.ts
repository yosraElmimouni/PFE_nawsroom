import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.local";

@Injectable({
  providedIn: 'root',
})
export class Gemini {

  private apikey = environment.geminiApiKey;

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

  getHistory() {
    const historyUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=' + this.apikey;
    return this.http.get(historyUrl);
  }
}