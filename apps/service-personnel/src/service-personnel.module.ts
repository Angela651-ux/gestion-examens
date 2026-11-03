import { Module } from '@nestjs/common';
import { ServicePersonnelController } from './service-personnel.controller';
import { ServicePersonnelService } from './service-personnel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnseignantModule } from './enseignant/enseignant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port:5432,
      username: 'postgres',
      password: 'Angela@2026',
      database: 'gestionexamen',
      autoLoadEntities: true,
      synchronize: false,
    }),
    EnseignantModule
  ],
  controllers: [ServicePersonnelController],
  providers: [ServicePersonnelService],
})
export class ServicePersonnelModule {}
