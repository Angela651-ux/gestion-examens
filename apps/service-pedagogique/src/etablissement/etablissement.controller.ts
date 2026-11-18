import { Controller } from '@nestjs/common';
import { EtablissementService } from './etablissement.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EtablissementController {

  constructor(
    private readonly etablissementService: EtablissementService
  ) {}

  @MessagePattern({ cmd: 'liste_etablissement' })
  async listeEtablissement() {
    return await this.etablissementService.listeEtablissement();
  }
}