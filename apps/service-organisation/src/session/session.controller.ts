import { Controller } from '@nestjs/common';
import { SessionService } from './session.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { sessionDTO } from '../dto/session.dto';

@Controller('session')
export class SessionController {
    constructor(private readonly Sessionservice: SessionService){}

    @MessagePattern({cmd:'prochain_code_Session'})
    prochainCodeSession(){
        return this.Sessionservice.prochainCodeSession();
    }

    @MessagePattern({cmd: 'enregistrerSess'})
     async enregisterSession(@Payload() data: sessionDTO){
        return this.Sessionservice.enregistrerSession(data);
     }

     @MessagePattern({cmd:'liste_session'})
     chargerSession(){
        return this.Sessionservice.chargerSession();
     }

     @MessagePattern({cmd:'modifier_session'})
     async modifierSession(@Payload() donnee: sessionDTO){
      return this.Sessionservice.modifierSession(donnee);
     }

     @MessagePattern({cmd:'supp_session'})
     async supprimerSession(@Payload() donnee: sessionDTO){
      return this.Sessionservice.supprimerSession(donnee.idsession);
     }

}
