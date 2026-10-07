import { NestFactory } from '@nestjs/core';
import { ServiceOrganistaionModule } from './service-organistaion.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceOrganistaionModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
