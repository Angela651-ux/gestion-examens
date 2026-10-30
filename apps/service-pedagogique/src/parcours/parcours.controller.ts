import { Controller } from '@nestjs/common';
import { ParcoursService } from './parcours.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ParcoursController {
    constructor(private readonly ParcoursService: ParcoursService){}

    @MessagePattern({ cmd : 'liste_parcours'})
    obtenirProchainParcours(){
        return this.ParcoursService.obtenirProchainParcours();
    }
}
