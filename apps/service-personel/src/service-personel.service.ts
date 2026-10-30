import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicePersonelService {
  getHello(): string {
    return 'Hello World!';
  }
}
