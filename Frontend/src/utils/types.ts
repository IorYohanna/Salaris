export interface Teacher {
    matricule: string;
    nom: string;
    tauxHoraire: number;
    nbreHeures: number;
    prestation?: number;
}

export interface User {
    email: string;
    name: string;
    password?: string;
}