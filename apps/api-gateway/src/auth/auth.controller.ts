import { Controller, Body, Inject, Post } from '@nestjs/common';
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
}

