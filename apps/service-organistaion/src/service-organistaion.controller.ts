import { Controller, Get } from '@nestjs/common';
import { ServiceOrganistaionService } from './service-organistaion.service';

@Controller()
export class ServiceOrganistaionController {
  constructor(private readonly serviceOrganistaionService: ServiceOrganistaionService) {}

  @Get()
  getHello(): string {
    return this.serviceOrganistaionService.getHello();
  }
}
