import { Controller, Get } from '@nestjs/common';
import { ServicePersonelService } from './service-personel.service';

@Controller()
export class ServicePersonelController {
  constructor(private readonly servicePersonelService: ServicePersonelService) {}

  @Get()
  getHello(): string {
    return this.servicePersonelService.getHello();
  }
}
