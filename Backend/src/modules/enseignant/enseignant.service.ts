import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enseignant } from './enseignant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnseignantService {
  constructor(
    @InjectRepository(Enseignant)
    private repo: Repository<Enseignant>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(matricule: string) {
    return this.repo.findOneBy({ matricule });
  }

  create(data: Partial<Enseignant>) {
    const enseignant = this.repo.create(data);
    return this.repo.save(enseignant);
  }

  async remove(matricule: string) {
    return this.repo.delete(matricule);
  }

  async update(matricule: string, data: Partial<Enseignant>) {
    const enseignant = await this.repo.preload({
      matricule,
      ...data,
    });

    if (!enseignant) {
      throw new Error('Enseignant non trouvé');
    }

    return this.repo.save(enseignant);
  }
  async getPrestationStats() {
    const enseignants = await this.repo.find();

    if (enseignants.length == 0) {
      return {
        total: 0,
        min: 0,
        max: 0,
      };
    }

    const prestations = enseignants.map((e) => ({
      ...e,
      prestation: e.tauxHoraire * e.nbreHeures,
    }));

    const values = prestations.map((p) => p.prestation);

    const total = values.reduce((acc, v) => acc + v, 0);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
      total,
      min,
      max,
      details: prestations,
    };
  }
}
