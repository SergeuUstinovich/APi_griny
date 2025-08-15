import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courier } from './courier.entity';
import { CourierUiController } from './courierui.controller';
import { TextparserModule } from 'src/textparser/textparser.module';

@Module({
  providers: [CourierService],
  controllers: [CourierController, CourierUiController],
  imports: [
    TypeOrmModule.forFeature([Courier]),
    TextparserModule
  ]
})
export class CourierModule {}
