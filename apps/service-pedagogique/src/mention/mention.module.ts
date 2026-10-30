import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MentionService } from './mention.service';
import { MentionController } from './mention.controller';
import { mention } from './mention.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([mention]),
    ],
    providers: [MentionService],
    controllers: [MentionController],
})
export class MentionModule {}
