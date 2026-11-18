import { Controller, Body, Inject, Post ,Get} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


@Controller('auth')
export class AuthController {

    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authClient: ClientProxy,
    ){}
    @Post('inscription')
    async inscription (@Body() data:any){
        return firstValueFrom(

            this.authClient.send(
                {cmd : 'inscription'},
                data,
            ),
        );
    }

    @Post('connection')
    async connection(@Body() data: any){
        return firstValueFrom(
            this.authClient.send(
                {cmd : 'connection'},
                data,
            ),
        );
    }

    @Get('prochainNum')
    numUtilisateur(){
        return this.authClient.send(
            {cmd : 'Charger_Num_Utilisateur'},
            {}
        );
    }
}

