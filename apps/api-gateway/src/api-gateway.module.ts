import { Module } from '@nestjs/common';
import{ClientsModule , Transport} from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport : Transport.TCP,
        options:{
          host: 'localhost',
          port: 3001,
        },

      },
  ]),
    ],

    controllers : [ApiGatewayController , AuthController],

    providers:[ ApiGatewayService],
    
  })
  export class ApiGatewayModule {}
  