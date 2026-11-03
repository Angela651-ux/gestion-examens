import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { session } from './session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([session])
  ],
  controllers: [SessionController],
  providers: [SessionService]
})
export class SessionModule {}
