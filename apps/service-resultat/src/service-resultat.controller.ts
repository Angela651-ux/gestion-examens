import { Controller, Get } from '@nestjs/common';
import { ServiceResultatService } from './service-resultat.service';

@Controller()
export class ServiceResultatController {
  constructor(private readonly serviceResultatService: ServiceResultatService) {}

  @Get()
  getHello(): string {
    return this.serviceResultatService.getHello();
  }
}
