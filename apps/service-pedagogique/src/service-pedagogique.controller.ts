import { Controller, Get } from '@nestjs/common';
import { ServicePedagogiqueService } from './service-pedagogique.service';

@Controller()
export class ServicePedagogiqueController {
  constructor(private readonly servicePedagogiqueService: ServicePedagogiqueService) {}

  @Get()
  getHello(): string {
    return this.servicePedagogiqueService.getHello();
  }
}
