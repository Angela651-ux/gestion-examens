import { Module } from '@nestjs/common';
import { SalleController } from './salle.controller';
import { SalleService } from './salle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salle } from './salle.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Salle]),
  ],
  controllers: [SalleController],
  providers: [SalleService]
})
export class SalleModule {}
