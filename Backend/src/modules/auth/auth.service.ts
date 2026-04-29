import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private repo: Repository<Auth>
    ) {}

    findAll() {
        return this.repo.find();
    }

    findOne(matricule: string) {
        return this.repo.findOneBy({ matricule });
    }

    create(data: Partial<Auth>) {
        const auth = this.repo.create(data)
        return this.repo.save(auth)
    }

    async remove(matricule: string) {
        return this.repo.delete(matricule)
    }

    async update(matricule: string, data: Partial<Auth>) {
    const auth = await this.repo.preload({
        matricule,
        ...data,
    });

    if (!auth) {
        throw new Error('Auth non trouvé');
    }

    return this.repo.save(auth);
}
}
