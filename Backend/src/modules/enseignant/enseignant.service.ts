import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

  async create(data: Partial<Enseignant>) {
    const exists = await this.repo.findOne({
      where: { matricule: data.matricule },
    });

    if (exists) {
      throw new ConflictException('Matricule déjà existant');
    }

    const enseignant = this.repo.create(data);
    return await this.repo.save(enseignant);
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
      throw new NotFoundException('Enseignant non trouvé');
    }

    return this.repo.save(enseignant);
  }

  async getPrestationStats() {
    const enseignants = await this.repo.find();

    if (enseignants.length === 0) {
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

    return {
      total: values.reduce((a, b) => a + b, 0),
      min: Math.min(...values),
      max: Math.max(...values),
      details: prestations,
    };
  }
}
