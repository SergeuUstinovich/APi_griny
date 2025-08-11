import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { CourierService } from './courier.service';
import type { Response } from 'express';

@Controller()
export class CourierUiController {
  constructor(private readonly courierService: CourierService) {}

  @Get()
  @Render('index')
  async showForm() {
    const count = await this.courierService.getCourierCount();
    return { count };
  }

  @Post('/submit')
  async submitForm(@Body('text') text: string, @Res() res: Response) {
    const lines = text
      .split(/\r?\n/)
      .map(line => line.trim())   
      .filter(line => line);
    await this.courierService.createCourier(lines);
    return res.redirect('/');
  }
}
