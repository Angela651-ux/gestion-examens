import { NestFactory } from '@nestjs/core';
import {Transport, MicroserviceOptions} from '@nestjs/microservices'
import { ServicePersonnelModule } from './service-personnel.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServicePersonnelModule,{
      transport: Transport.TCP,
      options: {
        host:'localhost',
        port: 3003,
      },
    },
  );
  await app.listen();
}
bootstrap();
