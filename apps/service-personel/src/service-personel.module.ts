import { Module } from '@nestjs/common';
import { ServicePersonelController } from './service-personel.controller';
import { ServicePersonelService } from './service-personel.service';
import { ChefmentionModule } from './chefmention/chefmention.module';
import { ChefmentionService } from './chefmention/chefmention.service';

@Module({
  imports: [ChefmentionModule],
  controllers: [ServicePersonelController],
  providers: [ServicePersonelService, ChefmentionService],
})
export class ServicePersonelModule {}
