import { Module } from '@nestjs/common';
import { EnseignantService } from './enseignant.service';
import { EnseignantController } from './enseignant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enseignant } from './enseignant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enseignant])],
  providers: [EnseignantService],
  controllers: [EnseignantController]
})
export class EnseignantModule {}
