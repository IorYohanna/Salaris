import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Enseignant {
    @PrimaryColumn()
    matricule: string;

    @Column()
    nom: string;

    @Column()
    tauxHoraire: number;

    @Column()
    nbreHeures: number;
}