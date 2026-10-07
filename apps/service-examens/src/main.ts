import { NestFactory } from '@nestjs/core';
import { ServiceExamensModule } from './service-examens.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceExamensModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
