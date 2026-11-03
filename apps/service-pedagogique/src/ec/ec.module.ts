import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EcController } from './ec.controller';
import { EcService } from './ec.service';
import { ec } from './ec.entity';
import { ue } from '../ue/ue.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ec ,ue]),
    ],
    providers: [EcService],
    controllers: [EcController]
})
export class EcModule {}
