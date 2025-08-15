import { Module } from '@nestjs/common';
import { TextparserService } from './textparser.service';
import { TextparserController } from './textparser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courier } from 'src/courier/courier.entity';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [TextparserService],
  controllers: [TextparserController],
  imports: [
      TypeOrmModule.forFeature([Courier]),
      HttpModule,
      ScheduleModule.forRoot(),
  ]
})
export class TextparserModule {}
