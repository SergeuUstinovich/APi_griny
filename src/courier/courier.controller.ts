import { Controller, Get, Query } from '@nestjs/common';
import { CourierService } from './courier.service';
import { GetCourierDto } from './dto/get-params-courier.dto';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Get()
  getCourier(@Query() dto: GetCourierDto) {
    return this.courierService.getCourier(dto)
  }
}
