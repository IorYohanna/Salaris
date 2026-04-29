import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryColumn()
  matricule: string;

  @Column({ type: 'varchar', nullable: true })
  mdp: string | null;

  @Column({ type: 'varchar', nullable: true })
  googleId: string | null;
}
