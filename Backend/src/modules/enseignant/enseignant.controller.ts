import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EnseignantService } from './enseignant.service';

@Controller('enseignant')
export class EnseignantController {
  constructor(private readonly service: EnseignantService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':matricule')
  findOne(@Param('matricule') matricule: string) {
    return this.service.findOne(matricule);
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Put(':matricule')
  update(@Param('matricule') matricule: string, @Body() body: any) {
    return this.service.update(matricule, body);
  }

  @Delete(':matricule')
  remove(@Param('matricule') matricule: string) {
    return this.service.remove(matricule);
  }

  @Get('stats/prestation')
  getStats() {
    return this.service.getPrestationStats();
  }
}