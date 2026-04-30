import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
@Unique(['matricule'])
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