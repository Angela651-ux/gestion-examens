import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Get } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller('svrpedag')
export class SvrpedagController {
    constructor(
        @Inject('PEDAGOGIQUE_SERVICE')
        private readonly pedagogiqueClient : ClientProxy,
    ){}

   @Get('etablissement')
async listeEtablissement() {
  return await firstValueFrom(
    this.pedagogiqueClient.send(
      { cmd: 'liste_etablissement' },
      {}
    )
  );
}
}
