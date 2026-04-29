import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryColumn()
    matricule: string;

    @Column()
    mdp: string;
}