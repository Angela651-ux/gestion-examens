import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';
import { TypeOrmModule, } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { concerner } from '../concerner/concerner.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Evaluation, concerner]),
  ],
  controllers: [EvaluationController],
  providers: [EvaluationService]
})
export class EvaluationModule {}