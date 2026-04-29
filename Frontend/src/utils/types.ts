export interface Teacher {
  matricule: string;
  nom: string;
  tauxHoraire: number;
  nbreHeures: number;
  prestation?: number;
}

export type User = {
  matricule: string;
  googleId?: string | null;
  token?: string;
};