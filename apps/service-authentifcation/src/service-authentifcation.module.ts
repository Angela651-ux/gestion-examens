import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm' ;

import { ServiceAuthentifcationController } from './service-authentifcation.controller';
import { ServiceAuthentifcationService } from './service-authentifcation.service';
import { Utilisateur } from './utilisateur.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432 ,
      username: 'postgres',
      password: 'Angela@2026',
      database: 'gestionexamen',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,

    }),
    TypeOrmModule.forFeature([Utilisateur])
  ],
  controllers: [ServiceAuthentifcationController],
  providers: [ServiceAuthentifcationService],
})
export class ServiceAuthentifcationModule {}
