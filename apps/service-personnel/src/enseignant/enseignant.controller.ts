import { Controller } from '@nestjs/common';
import { EnseignantService } from './enseignant.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('enseignant')
export class EnseignantController {
    constructor(private readonly  EnseignantService : EnseignantService){}

    @MessagePattern({ cmd : 'liste_enseignant'})
    listeEnseignant(){
        return this.EnseignantService.listeEnseignant();
    }
}
