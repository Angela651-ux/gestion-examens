import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tables } from './table.entity';
import { Salle } from '../salle/salle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tables, Salle]),
  ],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}