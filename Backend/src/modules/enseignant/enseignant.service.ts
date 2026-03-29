import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enseignant } from './enseignant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnseignantService {
    constructor(
        @InjectRepository(Enseignant)
        private repo: Repository<Enseignant>
    ) {}

    findAll() {
        return this.repo.find();
    }

    findOne(matricule: string) {
        return this.repo.findOneBy({ matricule });
    }

    create(data: Partial<Enseignant>) {
        const enseignant = this.repo.create(data)
        return this.repo.save(enseignant)
    }

    async remove(matricule: string) {
        return this.repo.delete(matricule)
    }
}
