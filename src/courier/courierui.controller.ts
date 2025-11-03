import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { CourierService } from './courier.service';
import type { Response } from 'express';
import { TextparserService } from 'src/textparser/textparser.service';
import { ProxyService } from 'src/proxy/proxy.service';

@Controller()
export class CourierUiController {
  constructor(
    private readonly courierService: CourierService,
    private readonly textparserService: TextparserService,
    private readonly proxyService: ProxyService,
  ) {}

  @Get()
  @Render('index')
  async showForm() {
    const countCourier = await this.courierService.getCourierCount();
    const urlCourier = this.textparserService.getTargetUrl('courier-url.txt', 'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv');
    const allProxy = await this.proxyService.getAllProxy()
    return { countCourier, urlCourier, allProxy };
  }

  @Post('/submitCourier')
  async submitForm(@Body('text') text: string, @Res() res: Response) {
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.courierService.createCourier(lines);
    return res.redirect('/');
  }

  @Post('/saveUrlCourier')
  async saveUrlForm(@Body('url') url: string, @Res() res: Response) {
    if (url) {
      await this.textparserService.setTargetUrl('courier-url.txt', url);
    }
    return res.redirect('/');
  }

  @Post('/submitProxy')
  async submitProxy(@Body('proxy') proxy: string, @Res() res: Response) {
    await this.proxyService.createProxy({proxy});
    return res.redirect('/');
  }
}
