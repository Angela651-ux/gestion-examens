import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceOrganisationService {
  getHello(): string {
    return 'Hello World!';
  }
}
