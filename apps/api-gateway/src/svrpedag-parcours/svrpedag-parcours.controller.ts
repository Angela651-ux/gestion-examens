import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('svrpedag-parcours')
export class SvrpedagParcoursController {
    constructor(
        @Inject('PEDAGOGIQUE_SERVICE')
        private readonly pedagogiqueClient: ClientProxy
    ){}

    @Get('parcours')
        obtenirProchainParcours() {
            return firstValueFrom( this.pedagogiqueClient.send(
                { cmd : 'liste_parcours'},
                {},
            ),
         );
        }
    }


