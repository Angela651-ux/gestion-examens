
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EtablissementController } from './etablissement.controller';
import { EtablissementService } from './etablissement.service';
import { etablissement } from './etablissement.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([etablissement]),
    ],
    providers: [
        EtablissementService
    ],
    controllers: [
        EtablissementController
    ],
    exports: [
        EtablissementService
    ]
})
export class EtablissementModule {}
