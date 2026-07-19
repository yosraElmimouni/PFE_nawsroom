import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, of, Observable } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Agenda } from 'src/app/core/models/Agenda.model';
import { SqliteService } from 'src/app/core/services/sqlite.service';
import { NetworkService } from 'src/app/core/services/network.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceAgenda {
  private apiUrl = 'https://newsroom-ai-api-u0vt.onrender.com/agenda';
  // private apiUrl = 'http://localhost:10000/agenda';

  constructor(
    private http: HttpClient,
    private network: NetworkService,
    private sqlite: SqliteService
  ) {}

  getAgendas(): Observable<Agenda[]> {
    if (this.network.online$.value) {
      return this.http.get<Agenda[]>(this.apiUrl).pipe(
        tap(agendas => this.sqlite.saveAgendasCache(agendas)),
        catchError(() => from(this.sqlite.getAgendasLocal()))
      );
    }
    return from(this.sqlite.getAgendasLocal());
  }

  getAgendaById(id: number): Observable<Agenda> {
    if (this.network.online$.value) {
      return this.http.get<Agenda>(`${this.apiUrl}/${id}`);
    }
    return from(this.sqlite.getAgendasLocal()).pipe(
      switchMap(agendas => {
        const agenda = agendas.find(a => a.id === id);
        if (agenda) {
          return of(agenda);
        } else {
          throw new Error('Agenda not found in local cache');
        }
      })
    );
  }

  createAgenda(agenda: Agenda): Observable<Agenda> {
    if (this.network.online$.value) {
      return this.http.post<Agenda>(this.apiUrl, agenda);
    }
    const localId = 'local_' + Date.now();
    const now = new Date().toISOString();
    const localAgenda: any = {
      ...agenda,
      id: null,
      local_id: localId,
      dateModification: now,
      synced: 0,
    };
    return from(
      this.sqlite.addPendingOperation('agenda', 'create', localId, agenda)
        .then(() => this.sqlite.saveAgendaLocal(localAgenda))
        .then(() => localAgenda)
    );
  }

  updateAgenda(id: number, agenda: Agenda): Observable<Agenda> {
    if (this.network.online$.value) {
      return this.http.patch<Agenda>(
        `${this.apiUrl}/${id}`,
        agenda
      );
    }
    const localId = 'local_' + Date.now();
    return from(
      this.sqlite.addPendingOperation('agenda', 'update', localId, agenda)
        .then(() => ({ ...agenda, id: -1, local_id: localId } as any))
    );
  }

  deleteAgenda(id: number): Observable<void> {
    if (this.network.online$.value) {
      return this.http.delete<void>(
        `${this.apiUrl}/${id}`
      );
    }
    const localId = 'local_' + Date.now();
    return from(
      this.sqlite.addPendingOperation('agenda', 'delete', localId, { id })
        .then(() => undefined)
    );
  }
}