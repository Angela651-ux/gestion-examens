import { Controller, Get } from '@nestjs/common';
import { ServiceOrganisationService } from './service-organisation.service';

@Controller()
export class ServiceOrganisationController {
  constructor(private readonly serviceOrganisationService: ServiceOrganisationService) {}

  @Get()
  getHello(): string {
    return this.serviceOrganisationService.getHello();
  }
}
