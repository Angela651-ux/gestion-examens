import { NestFactory } from '@nestjs/core';
import {Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ServicePedagogiqueModule } from './service-pedagogique.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
ServicePedagogiqueModule,{
  transport: Transport.TCP,
  options:{
    host: 'localhost',
    port: 3002,
  },
},
  );

  await app.listen();
  
}
bootstrap();
