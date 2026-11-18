import { Body, Controller, Delete, Get, Inject,Param,ParseIntPipe,Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('svrorg')
export class SvrorgController {
    constructor(
        @Inject('ORG_SERVICE')
        private readonly orgClient :ClientProxy
    ){}

    @Get('prochainCodeSession')
    prochainCodeSession(){
        return this.orgClient.send(
            {cmd: 'prochain_code_Session'},
            {}
        );
    }
    @Post('enregistrerSession')
    async enregistrerSession(@Body() data:any){
    return firstValueFrom(
        this.orgClient.send(
            {cmd : 'enregistrerSess'},
            data,
        )
    )
    }

    @Get('listeSession')
    chargerSession(){
        return this.orgClient.send(
            {cmd: 'liste_session'},
            {}
        );
    }

   @Put('modifierSession/:id') 
   async modifierSession(
    @Param('id' , ParseIntPipe) id:number,
    @Body() donnee: any,
   ){
    return this.orgClient.send(
        {cmd: 'modifier_session'},
        {...donnee,
            idsession:id,
        },
    );
   }

   @Delete('supprimerSession/:id')
   async supprimerSession(
    @Param('id' , ParseIntPipe) id:number,
   ){
    return this.orgClient.send(
        {cmd: 'supp_session'},
        {idsession: id},
    );
   }

   @Get('codeEval')
   codeEvaluation(){
    return this.orgClient.send(
        {cmd : 'code_ev'},
        {}
    )
   }

   @Post('enregistrerEv')
   async enregistrerEv(@Body() data:any){
    return  firstValueFrom(
        this.orgClient.send(
        {cmd:'enregistrer_Ev'},
        data,
    )
)
   }
}
