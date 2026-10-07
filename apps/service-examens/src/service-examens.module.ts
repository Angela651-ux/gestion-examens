import { Module } from '@nestjs/common';
import { ServiceExamensController } from './service-examens.controller';
import { ServiceExamensService } from './service-examens.service';

@Module({
  imports: [],
  controllers: [ServiceExamensController],
  providers: [ServiceExamensService],
})
export class ServiceExamensModule {}
