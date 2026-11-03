import { Module } from '@nestjs/common';
import { SeanceController } from './seance.controller';
import { SeanceService } from './seance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seance } from './seance.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Seance]),
  ],
  controllers: [SeanceController],
  providers: [SeanceService]
})
export class SeanceModule {}
