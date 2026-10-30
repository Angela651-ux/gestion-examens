import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicePedagogiqueService {
  getHello(): string {
    return 'Hello World!';
  }
}
