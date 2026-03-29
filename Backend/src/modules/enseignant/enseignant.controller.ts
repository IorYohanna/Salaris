import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
        return this.service.findOne(matricule)
    }

    @Post()
    create(@Body() body:any ) {
        return this.service.create(body)
    }

    @Delete(':matricule')
    remove(@Param('matricule') matricule: string) {
        return this.service.remove(matricule)
    }
}
