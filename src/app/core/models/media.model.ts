import { MediaType } from './article.enums';

export interface Media {
  id: number;
  type: MediaType;
  src: string;
  label: string;

  author?: string;
  date?: string;
  thumbnail?: string;
  duration?: string;
}