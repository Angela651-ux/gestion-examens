import { Controller, Get } from '@nestjs/common';
import { ServicePersonnelService } from './service-personnel.service';

@Controller()
export class ServicePersonnelController {
  constructor(private readonly servicePersonnelService: ServicePersonnelService) {}

  @Get()
  getHello(): string {
    return this.servicePersonnelService.getHello();
  }
}
