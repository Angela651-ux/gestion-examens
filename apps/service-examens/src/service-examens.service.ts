import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceExamensService {
  getHello(): string {
    return 'Hello World!';
  }
}
