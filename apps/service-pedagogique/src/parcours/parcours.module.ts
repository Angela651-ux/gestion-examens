import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParcoursController } from './parcours.controller';
import { ParcoursService } from './parcours.service';
import { parcours } from './parcours.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([parcours]),
    ],
    providers: [ParcoursService],
    controllers: [ParcoursController]
})
export class ParcoursModule {}
