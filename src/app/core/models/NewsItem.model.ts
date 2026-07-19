import { CategorieNews } from './enums/CategorieNews';
import { Media } from './media.model';
import { Source } from './source.model';

export interface NewsItem {
 id: number;
  titre: string;
  contenu: string;
  categorie: CategorieNews;
  url: string;
  datePublication: Date;
  source:Source;

}