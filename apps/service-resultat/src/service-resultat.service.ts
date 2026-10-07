import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceResultatService {
  getHello(): string {
    return 'Hello World!';
  }
}
