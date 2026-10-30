import { Controller } from '@nestjs/common';
import { UeService } from './ue.service';
import { MessagePattern , Payload} from '@nestjs/microservices';
import { ueDTO } from '../dto/ue.dto';


@Controller()
export class UeController {
    constructor(private readonly UeService: UeService,){}

@MessagePattern({ cmd: 'prochain_code_ue' })
obtenirProchainUE() {
  return this.UeService.obtenirProchainUE();
}

@MessagePattern({ cmd: 'enregistrerUe'})
async enregistrerUe (@Payload() data :ueDTO){
  return this.UeService.enregistrerUe(data);
}

@MessagePattern({cmd:'liste_ue'})
obtenirListeUe(){
  return this.UeService.obtenirListeUe();
}

@MessagePattern({cmd:'modifier_Ue'})
async modifierUE(@Payload() donnee: ueDTO){
return this.UeService.modifierUE(donnee);}

@MessagePattern({cmd:'supprimer_UE'})
async supprimerUe(@Payload() donnee : ueDTO){
  return this.UeService.supprimerUe(donnee.idue);
}
}


