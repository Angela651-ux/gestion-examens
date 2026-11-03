import { Controller } from '@nestjs/common';
import { EcService } from './ec.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ecDTO } from '../dto/ec.dto';

@Controller('ec')
export class EcController {
    constructor(private readonly EcService: EcService){}

    @MessagePattern({ cmd : 'Afficher_liste_UE'})
    listeUe(){
        return this.EcService.listeUe();
    }

    @MessagePattern({cmd : 'Charger_Code_Ec'})
CodeEC(){
    return this.EcService.CodeEC();
}

@MessagePattern({cmd: 'Ajout_ec'})
async AjoutEC(@Payload() data: ecDTO){
    return this.EcService.AjoutEC(data);
}

@MessagePattern({cmd: 'Liste_EC'})
obtenirListeEC(){
    return this.EcService.obtenirListeEC();
}

@MessagePattern({cmd: 'modifier_ec'})
async modifierEC(@Payload() donnee:ecDTO){
    return this.EcService.modifierEC(donnee);
}

@MessagePattern({cmd: 'supprimer_EC'})
async supprimerEC(@Payload() donnee:ecDTO){
    return this.EcService.supprimerEC(donnee.idec);
}
}
