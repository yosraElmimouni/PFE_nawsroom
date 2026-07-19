import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { Capacitor } from '@capacitor/core';

export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}


export interface AiHistoryEntry {
  id: number;
  question: string;
  resultat: string;
  dateAnalyse: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiAssistant {
  private apikey = environment.geminiApiKey;

  private historyApiUrl = 'https://newsroom-ai-api-u0vt.onrender.com/ia-analyse';
  // private historyApiUrl = 'http://localhost:10000/ia-analyse';

  private get apiUrl(): string {
    return Capacitor.isNativePlatform()
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : '/openrouter-api/api/v1/chat/completions';
  }

  constructor(private http: HttpClient) {}

  /**
   * Envoie l'intégralité de l'historique de conversation à l'IA afin qu'elle
   * conserve le contexte (au lieu d'un simple prompt isolé).
   */
  sendMessage(history: AiChatMessage[]): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apikey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:8100',
    });

    return this.http
      .post<{ choices: { message: { content: string } }[] }>(
        this.apiUrl,
        {
          model: 'openrouter/auto',
          messages: history,
        },
        { headers },
      )
      .pipe(map((res) => res.choices[0].message.content));
  }

  // ── Historique persistant côté backend (table ia_analyses) ──────────
  getHistory(userId: number): Observable<AiHistoryEntry[]> {
    return this.http.get<AiHistoryEntry[]>(`${this.historyApiUrl}/history/${userId}`);
  }

  /** Enregistre un échange complet (question + réponse) après réception de la réponse IA */
  saveExchange(userId: number, question: string, resultat: string): Observable<AiHistoryEntry> {
    return this.http.post<AiHistoryEntry>(this.historyApiUrl, {
      userId,
      question,
      resultat,
    });
  }

  clearHistory(userId: number): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.historyApiUrl}/history/${userId}`);
  }
}