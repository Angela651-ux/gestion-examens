import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { etablissement } from './etablissement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EtablissementService {

  constructor(
    @InjectRepository(etablissement)
    private readonly Etablissementrepository: Repository<etablissement>
  ) {}

  async listeEtablissement() {
    try {
      const etablissements = await this.Etablissementrepository.find();

      console.log('Établissements récupérés :', etablissements);

      return etablissements;

    } catch (error) {
      console.error('Erreur PostgreSQL :', error);
      throw error;
    }
  }
}
