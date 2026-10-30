import { NestFactory } from '@nestjs/core';
import { ServicePersonelModule } from './service-personel.module';

async function bootstrap() {
  const app = await NestFactory.create(ServicePersonelModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
