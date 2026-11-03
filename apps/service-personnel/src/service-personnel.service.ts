import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicePersonnelService {
  getHello(): string {
    return 'Hello World!';
  }
}
