import { ArticleStatus } from './article.enums';
import { Media } from './media.model';

export interface Article {
  id: number;

  status: ArticleStatus;

  categorie: string;
  date: Date;

  title: string;
  description: string;

  image: string;
  media: Media[];
  tags: string[];
}