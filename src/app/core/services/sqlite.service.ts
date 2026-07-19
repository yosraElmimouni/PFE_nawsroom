import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({ providedIn: 'root' })
export class SqliteService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private ready = false;

  async init() {
    if (this.ready) return;
    if (Capacitor.getPlatform() === 'web') {
      await customElements.whenDefined('jeep-sqlite');
      await this.sqlite.initWebStore();
    }
    this.db = await this.sqlite.createConnection('newsroom_db', false, 'no-encryption', 1, false);
    await this.db.open();

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER,
        local_id TEXT PRIMARY KEY,
        statut TEXT,
        categorie TEXT,
        titre TEXT,
        contenu TEXT,
        image TEXT,
        tags TEXT,
        dateCreation TEXT,
        dateModification TEXT,
        synced INTEGER DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS agendas (
        id INTEGER,
        local_id TEXT PRIMARY KEY,
        titre TEXT,
        categorie TEXT,
        resume TEXT,
        importance TEXT,
        dateDebut TEXT,
        dateFin TEXT,
        lieu TEXT,
        synced INTEGER DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS news_items (
        id INTEGER,
        local_id TEXT PRIMARY KEY,
        titre TEXT,
        contenu TEXT,
        categorie TEXT,
        url TEXT,
        datePublication TEXT,
        source TEXT,
        synced INTEGER DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS pending_operations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entity_type TEXT,
        operation TEXT,
        local_id TEXT,
        payload TEXT,
        created_at TEXT,
        synced INTEGER DEFAULT 0
      );
    `);

   
    await this.ensureColumn('articles', 'tags', 'TEXT');

    this.ready = true;
  }

  private async ensureColumn(table: string, column: string, type: string) {
    try {
      await this.db.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
    } catch (e) {
      // colonne déjà existante -> on ignore silencieusement
    }
  }

  // ============================================================
  // ARTICLES
  // ============================================================

  async saveArticlesCache(articles: any[]) {
    for (const a of articles) {
      await this.db.run(
        `INSERT OR REPLACE INTO articles (id, local_id, statut, categorie, titre, contenu, image, tags, dateCreation, dateModification, synced)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [
          a.id,
          'srv_' + a.id,
          a.statut,
          a.categorie,
          a.titre,
          a.contenu,
          a.image ?? null,
          JSON.stringify(a.tags ?? []),
          a.dateCreation,
          a.dateModification,
        ]
      );
    }
  }

  async saveArticleLocal(article: any) {
    if (!this.ready || !this.db) return;
    await this.db.run(
      `INSERT OR REPLACE INTO articles (id, local_id, statut, categorie, titre, contenu, image, tags, dateCreation, dateModification, synced)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        article.id ?? null,
        article.local_id,
        article.statut,
        article.categorie,
        article.titre,
        article.contenu,
        article.image ?? null,
        JSON.stringify(article.tags ?? []),
        article.dateCreation,
        article.dateModification,
      ]
    );
  }

  // Confirme la synchro d'une création/mise à jour : remplace la ligne
  // locale existante (identifiée par son ancien local_id) au lieu d'en
  // insérer une nouvelle. C'est ça qui évite la duplication.
  async confirmCreatedArticle(oldLocalId: string, article: any) {
    if (!this.ready || !this.db) return;
    await this.db.run(
      `UPDATE articles
       SET id = ?, local_id = ?, statut = ?, categorie = ?, titre = ?, contenu = ?, image = ?, tags = ?, dateCreation = ?, dateModification = ?, synced = 1
       WHERE local_id = ?`,
      [
        article.id,
        'srv_' + article.id,
        article.statut,
        article.categorie,
        article.titre,
        article.contenu,
        article.image ?? null,
        JSON.stringify(article.tags ?? []),
        article.dateCreation,
        article.dateModification,
        oldLocalId,
      ]
    );
  }

  async removeArticleLocalByLocalId(localId: string) {
    if (!this.ready || !this.db) return;
    await this.db.run(`DELETE FROM articles WHERE local_id = ?`, [localId]);
  }

  async getArticlesLocal(): Promise<any[]> {
    if (!this.ready || !this.db) return [];
    const res = await this.db.query(`SELECT * FROM articles ORDER BY dateModification DESC`);
    return (res.values ?? []).map((a: any) => ({
      ...a,
      tags: a.tags ? JSON.parse(a.tags) : [],
    }));
  }

  // ============================================================
  // AGENDA
  // ============================================================

  async saveAgendasCache(agendas: any[]) {
    for (const a of agendas) {
      await this.db.run(
        `INSERT OR REPLACE INTO agendas (id, local_id, titre, categorie, resume, importance, dateDebut, dateFin, lieu, synced)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [a.id, 'srv_' + a.id, a.titre, a.categorie, a.resume, a.importance, a.dateDebut, a.dateFin, a.lieu]
      );
    }
  }

  async saveAgendaLocal(agenda: any) {
    if (!this.ready || !this.db) return;
    await this.db.run(
      `INSERT OR REPLACE INTO agendas (id, local_id, titre, categorie, resume, importance, dateDebut, dateFin, lieu, synced)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        agenda.id ?? null,
        agenda.local_id,
        agenda.titre,
        agenda.categorie,
        agenda.resume,
        agenda.importance,
        agenda.dateDebut,
        agenda.dateFin,
        agenda.lieu,
      ]
    );
  }

  async confirmCreatedAgenda(oldLocalId: string, agenda: any) {
    if (!this.ready || !this.db) return;
    await this.db.run(
      `UPDATE agendas
       SET id = ?, local_id = ?, titre = ?, categorie = ?, resume = ?, importance = ?, dateDebut = ?, dateFin = ?, lieu = ?, synced = 1
       WHERE local_id = ?`,
      [
        agenda.id,
        'srv_' + agenda.id,
        agenda.titre,
        agenda.categorie,
        agenda.resume,
        agenda.importance,
        agenda.dateDebut,
        agenda.dateFin,
        agenda.lieu,
        oldLocalId,
      ]
    );
  }

  async removeAgendaLocalByLocalId(localId: string) {
    if (!this.ready || !this.db) return;
    await this.db.run(`DELETE FROM agendas WHERE local_id = ?`, [localId]);
  }

  async getAgendasLocal(): Promise<any[]> {
    if (!this.ready || !this.db) return [];
    const res = await this.db.query(`SELECT * FROM agendas ORDER BY dateDebut DESC`);
    return res.values ?? [];
  }

  // ============================================================
  // VEILLE INFO (news items)
  // ============================================================

  async saveNewsItemsCache(items: any[]) {
    for (const n of items) {
      await this.db.run(
        `INSERT OR REPLACE INTO news_items (id, local_id, titre, contenu, categorie, url, datePublication, source, synced)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [
          n.id,
          'srv_' + n.id,
          n.titre,
          n.contenu,
          n.categorie,
          n.url,
          n.datePublication,
          JSON.stringify(n.source ?? null),
        ]
      );
    }
  }

  async saveNewsItemLocal(item: any) {
    if (!this.ready || !this.db) return;
    await this.db.run(
      `INSERT OR REPLACE INTO news_items (id, local_id, titre, contenu, categorie, url, datePublication, source, synced)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        item.id ?? null,
        item.local_id,
        item.titre,
        item.contenu,
        item.categorie,
        item.url,
        item.datePublication,
        JSON.stringify(item.source ?? null),
      ]
    );
  }

  async confirmCreatedNewsItem(oldLocalId: string, item: any) {
    if (!this.ready || !this.db) return;
    await this.db.run(
      `UPDATE news_items
       SET id = ?, local_id = ?, titre = ?, contenu = ?, categorie = ?, url = ?, datePublication = ?, source = ?, synced = 1
       WHERE local_id = ?`,
      [
        item.id,
        'srv_' + item.id,
        item.titre,
        item.contenu,
        item.categorie,
        item.url,
        item.datePublication,
        JSON.stringify(item.source ?? null),
        oldLocalId,
      ]
    );
  }

  async removeNewsItemLocalByLocalId(localId: string) {
    if (!this.ready || !this.db) return;
    await this.db.run(`DELETE FROM news_items WHERE local_id = ?`, [localId]);
  }

  async getNewsItemsLocal(): Promise<any[]> {
    if (!this.ready || !this.db) return [];
    const res = await this.db.query(`SELECT * FROM news_items ORDER BY datePublication DESC`);
    return (res.values ?? []).map((n: any) => ({
      ...n,
      source: n.source ? JSON.parse(n.source) : {},
    }));
  }



  // ============================================================
  // PENDING OPERATIONS (générique, déjà partagé par toutes les entités)
  // ============================================================

  async addPendingOperation(entityType: string, operation: string, localId: string, payload: any) {
    await this.db.run(
      `INSERT INTO pending_operations (entity_type, operation, local_id, payload, created_at) VALUES (?, ?, ?, ?, ?)`,
      [entityType, operation, localId, JSON.stringify(payload), new Date().toISOString()]
    );
  }

  async getPendingOperations(): Promise<any[]> {
    const res = await this.db.query(`SELECT * FROM pending_operations WHERE synced = 0`);
    return res.values ?? [];
  }

  async markOperationSynced(opId: number) {
    await this.db.run(`UPDATE pending_operations SET synced = 1 WHERE id = ?`, [opId]);
  }
}