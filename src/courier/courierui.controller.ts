import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { CourierService } from './courier.service';
import type { Response } from 'express';
import { TextparserService } from 'src/textparser/textparser.service';

@Controller()
export class CourierUiController {
  constructor(
    private readonly courierService: CourierService,
    private readonly textparserService: TextparserService,
  ) {}

  @Get()
  @Render('index')
  async showForm() {
    const count = await this.courierService.getCourierCount();
    const url = this.textparserService.getTargetUrl();
    return { count, url };
  }

  @Post('/submit')
  async submitForm(@Body('text') text: string, @Res() res: Response) {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.courierService.createCourier(lines);
    return res.redirect('/');
  }

  @Post('/saveUrl')
  async saveUrlForm(@Body('url') url: string, @Res() res: Response) {
    if (url) {
      await this.textparserService.setTargetUrl(url);
    }
    return res.redirect('/');
  }
}
