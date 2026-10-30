import { Module } from '@nestjs/common';
import{ClientsModule , Transport} from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthController } from './auth/auth.controller';
import { SvrpedagUeController } from './svrpedag-ue/svrpedag-ue.controller';
import { SvrpedagParcoursController } from './svrpedag-parcours/svrpedag-parcours.controller';


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
      {
        name: 'PEDAGOGIQUE_SERVICE',
        transport: Transport.TCP,
        options:{
          host: 'localhost',
          port: 3002,
        }
      }
  ]),
    ],

    controllers : [ApiGatewayController , AuthController, SvrpedagUeController, SvrpedagParcoursController],

    providers:[ ApiGatewayService,SvrpedagUeController ],
    
  })
  export class ApiGatewayModule {}
  