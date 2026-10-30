import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parcours } from './parcours.entity';


@Injectable()
export class ParcoursService {

    constructor(
        @InjectRepository(parcours)
        private readonly parcoursRepository: Repository<parcours>
    ){}

    async obtenirProchainParcours(){
        const parcoursrecuperes = await this.parcoursRepository.find();

        return parcoursrecuperes;
    }
}
