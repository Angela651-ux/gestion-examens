
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServicePedagogiqueController } from './service-pedagogique.controller';
import { ServicePedagogiqueService } from './service-pedagogique.service';

import { UeModule } from './ue/ue.module';
import { ParcoursModule } from './parcours/parcours.module';
import { EcModule } from './ec/ec.module';
import { EtablissementModule } from './etablissement/etablissement.module';
import { MentionModule } from './mention/mention.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Angela@2026',
      database: 'gestionexamen',
      autoLoadEntities: true,
      synchronize: false,
    }),

    UeModule,
    ParcoursModule,
    EcModule,
    EtablissementModule,
    MentionModule,
  ],

  controllers: [ServicePedagogiqueController],

  providers: [ServicePedagogiqueService],
})
export class ServicePedagogiqueModule {}
