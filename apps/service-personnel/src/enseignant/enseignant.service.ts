import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enseignant } from './enseignant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnseignantService {
constructor(
    @InjectRepository(Enseignant)
    private readonly  EnseignantRepository: Repository<Enseignant>
){}

async listeEnseignant(){
    const enseignant = await this.EnseignantRepository.find();

    return enseignant;
}
}
