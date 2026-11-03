import { Controller , Inject ,Get, Body , Post, Put, Param, ParseIntPipe, Delete} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('svrpedag-ec')
export class SvrpedagEcController {
    constructor(
    @Inject('PEDAGOGIQUE_SERVICE')
    private readonly pedagogiqueClient : ClientProxy){}

    @Get('listeUe')
    listeUE(){
        return this.pedagogiqueClient.send(
            {cmd : 'Afficher_liste_UE'},
            {}
        );
    }

    @Get('prochainCodeEC')
    CodeEC(){
return this.pedagogiqueClient.send(
    {cmd : 'Charger_Code_Ec'},
    {}
);
    }

    @Post('enregistrerEC')
   async AjoutEC(@Body() data : any){
        return  firstValueFrom(
            this.pedagogiqueClient.send(
            {cmd : 'Ajout_ec'},
            data,
        )
    )
    }

    @Get('ListeEC')
    obtenirListeEC(){
        return this.pedagogiqueClient.send(
            {cmd: 'Liste_EC'},
            {}
        )
    }

    @Put('modifierEC/:id')
    async modifierEC(
        @Param('id' ,ParseIntPipe) id:number,
        @Body() donnee:any,
    ){
        return this.pedagogiqueClient.send(
            {cmd: 'modifier_ec'},
            {...donnee,
                idec:id,
            },
        );
    }

    @Delete('supprimerEC/:id')
    async supprimerEC(
        @Param('id' , ParseIntPipe) id: number,
    ){
        return this.pedagogiqueClient.send(
            {cmd: 'supprimer_EC'},
            {idec: id},
        );
    }
}
