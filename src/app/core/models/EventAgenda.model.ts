export interface EventAgenda {
  titre: string;
  categorie: string;
  resume: string;
  importance: 'important'|'normale';
  dateDebut: Date;
  dateFin: Date;
  lieu: string;
}