import { Module } from '@nestjs/common';
import { ServiceOrganistaionController } from './service-organistaion.controller';
import { ServiceOrganistaionService } from './service-organistaion.service';

@Module({
  imports: [],
  controllers: [ServiceOrganistaionController],
  providers: [ServiceOrganistaionService],
})
export class ServiceOrganistaionModule {}
