import { Module } from '@nestjs/common';
import { ServiceResultatController } from './service-resultat.controller';
import { ServiceResultatService } from './service-resultat.service';

@Module({
  imports: [],
  controllers: [ServiceResultatController],
  providers: [ServiceResultatService],
})
export class ServiceResultatModule {}
