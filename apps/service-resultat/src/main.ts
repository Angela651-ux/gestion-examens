import { NestFactory } from '@nestjs/core';
import { ServiceResultatModule } from './service-resultat.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceResultatModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
