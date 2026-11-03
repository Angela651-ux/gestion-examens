import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeanceService } from './seance/seance.service';


@Module({
  
  controllers: [AppController],
  providers: [AppService, SeanceService],
})
export class AppModule {}