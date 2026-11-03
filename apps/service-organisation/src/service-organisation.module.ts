import { Module } from '@nestjs/common';
import { ServiceOrganisationController } from './service-organisation.controller';
import { ServiceOrganisationService } from './service-organisation.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionModule } from './session/session.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { SeanceModule } from './seance/seance.module';
import { SalleModule } from './salle/salle.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'postgres',
  host:'localhost',
  port:5432,
  username:'postgres',
  password:'Angela@2026',
  database:'gestionexamen',
  autoLoadEntities: true,
  synchronize: false,
}),
SessionModule,
EvaluationModule,
SeanceModule,
SalleModule,
TableModule
  ],
  controllers: [ServiceOrganisationController],
  providers: [ServiceOrganisationService],
})
export class ServiceOrganisationModule {}
