import { Module } from '@nestjs/common';
import { ConcernerController } from './concerner.controller';
import { ConcernerService } from './concerner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { concerner } from './concerner.entity';

@Module({
  imports: [
TypeOrmModule.forFeature([concerner])
  ],
  controllers: [ConcernerController],
  providers: [ConcernerService]
})
export class ConcernerModule {}
