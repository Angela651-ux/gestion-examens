import { Controller, Get } from '@nestjs/common';
import { ServiceExamensService } from './service-examens.service';

@Controller()
export class ServiceExamensController {
  constructor(private readonly serviceExamensService: ServiceExamensService) {}

  @Get()
  getHello(): string {
    return this.serviceExamensService.getHello();
  }
}
