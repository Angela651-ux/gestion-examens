import { Controller , Body, Post, Inject ,Get, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';



@Controller('svrpedag-ue')
export class SvrpedagUeController {
    constructor(
        @Inject('PEDAGOGIQUE_SERVICE')
        private readonly pedagogiqueClient: ClientProxy
    ){}

    @Get('prochain-code')
obtenirProchainUE() {
  return this.pedagogiqueClient.send(
    { cmd: 'prochain_code_ue' },
    {},
  );
}

@Post('enregistrerUE')
async enregistrerUe(@Body() data:any){
  return firstValueFrom(
    this.pedagogiqueClient.send(
      { cmd : 'enregistrerUe'},
      data,
    )
  )
}

@Get('listeUE')
obtenirListeUe(){
  return this.pedagogiqueClient.send(
    { cmd : 'liste_ue'},
    {}
  );
}
   
@Put('modifierUE/:id')
async modifierUE(
  @Param('id', ParseIntPipe) id:number,
  @Body() donnee: any,
){
  return this.pedagogiqueClient.send(
    {cmd : 'modifier_Ue'},
    {... donnee,
      idue:id,
    },
  );
}

@Delete('supprimerUE/:id')
async supprimerUE(
  @Param('id', ParseIntPipe) id:number,
  ){
    return this.pedagogiqueClient.send(
      {cmd: 'supprimer_UE'},
      {idue: id},
    );
  }

    
}
