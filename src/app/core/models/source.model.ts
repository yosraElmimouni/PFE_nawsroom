import { TypeSource } from "./enums/TypeSource";

export interface Source {
  id: number;

  
  nom: string;

  
  url: string;

  
  type: TypeSource;


  fiable: boolean;

  logoUrl: string;

  
  pays: string;

  
  langue: string;

  
  dateCreation: Date;

}