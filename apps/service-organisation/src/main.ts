import { NestFactory } from '@nestjs/core';
import { ServiceOrganisationModule } from './service-organisation.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ServiceOrganisationModule, {
      transport: Transport.TCP,
      options:{
        host:'localhost',
        port:3004,
      },
    },
   );
  await app.listen();
}
bootstrap();
