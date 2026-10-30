
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UeService } from './ue.service';
import { UeController } from './ue.controller';
import { ue } from './ue.entity';
import { parcours } from '../parcours/parcours.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ue, parcours]),
  ],
  providers: [UeService],
  controllers: [UeController],
})
export class UeModule {}
