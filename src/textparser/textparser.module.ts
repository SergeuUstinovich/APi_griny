import { Module } from '@nestjs/common';
import { TextparserService } from './textparser.service';
import { TextparserController } from './textparser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courier } from 'src/courier/courier.entity';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { DynamicRequestService } from './dynamicrequest.service';

@Module({
  providers: [TextparserService, DynamicRequestService],
  controllers: [TextparserController],
  imports: [
      TypeOrmModule.forFeature([Courier]),
      HttpModule,
      ScheduleModule.forRoot(),
  ],
  exports: [TextparserService]
})
export class TextparserModule {}
