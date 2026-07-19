import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { ArticleService } from 'src/app/features/articles/services/article.service';
import { NetworkService } from './network.service';
import { SqliteService } from './sqlite.service';
import { ServiceAgenda } from 'src/app/features/agenda/service-agenda';
import { ServiceVeille } from 'src/app/features/veille-info/service-veille';

@Injectable({ providedIn: 'root' })
export class SyncService {
  private isSyncing = false;
  private networkTrigger$ = new Subject<boolean>();

  constructor(
    private sqlite: SqliteService,
    private articleService: ArticleService,
    private network: NetworkService,
    private agendaService: ServiceAgenda,
    private veilleService: ServiceVeille,
  ) {
    // Debounce de 2 secondes : ignore les événements multiples rapides
    this.networkTrigger$
      .pipe(
        filter((online) => online),
        debounceTime(2000), // ← attend 2s de stabilité avant de lancer la sync
      )
      .subscribe(() => this.synchroniser());

    this.network.online$.subscribe((online) => {
      this.networkTrigger$.next(online);
    });
  }

  async synchroniser() {
    if (this.isSyncing) return;
    this.isSyncing = true;
    console.log('[Sync] Démarrage synchronisation...');
    try {
      const ops = await this.sqlite.getPendingOperations();
      for (const op of ops) {
        const payload = JSON.parse(op.payload);
        try {
          await this.executeOperation(op.entity_type, op.operation, payload);
          await this.sqlite.markOperationSynced(op.id);
          console.log('[Sync] Opération', op.id, 'synchronisée avec succès');
        } catch (e: any) {
          if (e?.status === 404) {
            await this.sqlite.markOperationSynced(op.id);
            console.log('[Sync] Opération', op.id, 'ignorée (404)');
          } else {
            console.error('[Sync] Échec', op.id, 'status:', e?.status);
          }
        }
      }
    } finally {
      this.isSyncing = false;
      console.log('[Sync] Synchronisation terminée');
    }
  }

  private async executeOperation(
    entityType: string,
    operation: string,
    payload: any,
  ): Promise<any> {
    if (entityType === 'agenda') {
      if (operation === 'create')
        return this.agendaService.createAgenda(payload).toPromise();
      if (operation === 'update')
        return this.agendaService.updateAgenda(payload.id, payload).toPromise();
      if (operation === 'delete')
        return this.agendaService.deleteAgenda(payload.id).toPromise();
    } else if (entityType === 'article') {
      if (operation === 'create')
        return this.articleService.createArticle(payload).toPromise();
      if (operation === 'update')
        return this.articleService
          .updateArticle(payload.id, payload)
          .toPromise();
      if (operation === 'delete')
        return this.articleService.deleteArticle(payload.id).toPromise();
    }
    else if (entityType === 'news-item') {
      if (operation === 'create')
        return this.veilleService.createNewsItem(payload).toPromise();
      if (operation === 'update')
        return this.veilleService
          .updateNewsItem(payload.id, payload)
          .toPromise();
      if (operation === 'delete')
        return this.veilleService.deleteNewsItem(payload.id).toPromise();
    }
    throw new Error(`Type d'entité inconnu: ${entityType}`);
  }
}
