import { ArticleStatus } from './enums/ArticleStatus';
import { Media } from './media.model';

export interface Article {
  id: number;
  statut: ArticleStatus;
  categorie: string;
  dateCreation: string;
  dateModification: string;
  datePublication: string | null;
  titre: string;
  contenu: string;
  image: string;
  media: Media[];
  tags: string[];
  auteur?: {          // ← ajouter
    id: number;
    nom: string;
    prenom: string;
    role?: { nomRole: string };
  };
}