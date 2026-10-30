import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChefmentionService } from './chefmention/chefmention.service';
import { ChefmentionController } from './chefmention/chefmention.controller';
import { ChefmentionModule } from './chefmention/chefmention.module';
import { ChefmentionController } from './chefmention/chefmention.controller';

@Module({
  imports: [ChefmentionModule],
  controllers: [AppController, ChefmentionController],
  providers: [AppService, ChefmentionService],
})
export class AppModule {}
