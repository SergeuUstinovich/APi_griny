import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { CourierService } from './courier.service';
import type { Response } from 'express';
import { TextparserService } from 'src/textparser/textparser.service';
import { ProxyService } from 'src/proxy/proxy.service';
import { ProxyMaksService } from 'src/proxy-maks/proxy-maks.service';

@Controller()
export class CourierUiController {
  constructor(
    private readonly courierService: CourierService,
    private readonly textparserService: TextparserService,
    private readonly proxyService: ProxyService,
    private readonly proxyMaksService: ProxyMaksService,
  ) {}

  @Get()
  @Render('index')
  async showForm() {
    const countCourier = await this.courierService.getCourierCount();
    const urlCourier = this.textparserService.getTargetUrl('courier-url.txt', 'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv');
    const allProxy = await this.proxyService.getAllProxy()
    const allProxyMaks = await this.proxyMaksService.getAllProxy()
    return { countCourier, urlCourier, allProxy, allProxyMaks };
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
  async submitProxy(@Body('proxy') proxys: string, @Res() res: Response) {
    const proxy = proxys
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.proxyService.createProxy({proxy});
    return res.redirect('/');
  }

  @Post('/deleteProxy')
  async deleteProxy(@Body('idProxy') id: string, @Res() res: Response) {
    await this.proxyService.deleteProxy(id);
    return res.redirect('/');
  }

  @Post('/submitProxyMaks')
  async submitProxyMaks(@Body('proxyMaks') proxys: string, @Res() res: Response) {
    const proxy = proxys
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.proxyMaksService.createProxy({proxy});
    return res.redirect('/');
  }

  @Post('/deleteProxyMaks')
  async deleteProxyMaks(@Body('idProxyMaks') id: string, @Res() res: Response) {
    await this.proxyMaksService.deleteProxy(id);
    return res.redirect('/');
  }
}
