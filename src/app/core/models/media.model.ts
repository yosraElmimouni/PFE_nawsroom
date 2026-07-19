import { MediaType } from "./enums/MediaType";

export interface Media {
  id: number;
  type: MediaType;
  urlFichier: string;
  titre: string;
  description: string;
  localisation: string;
  author?: string;
  dateCapture?: string;
}