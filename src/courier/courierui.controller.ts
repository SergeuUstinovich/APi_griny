import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CourierService } from './courier.service';
import type { Response } from 'express';
import { TextparserService } from 'src/textparser/textparser.service';
import { ProxyService } from 'src/proxy/proxy.service';
import { ProxyMaksService } from 'src/proxy-maks/proxy-maks.service';
import { BasicAuthGuard } from 'src/common/guards/basic-auth.guard';
import { ProxyType } from 'src/proxy/proxy-type.enum';
import { ProxyTypeMaks } from 'src/proxy-maks/proxy-maks-type.enum';

@UseGuards(BasicAuthGuard)
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
    const urlCourier = this.textparserService.getTargetUrl(
      'courier-url.txt',
      'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv',
    );
    const allProxyRez = await this.proxyService.getAllProxy(
      ProxyType.RESIDENTIAL,
    );
    const allProxyMaksRez = await this.proxyMaksService.getAllProxy(
      ProxyTypeMaks.RESIDENTIAL,
    );
    const allProxyMob = await this.proxyService.getAllProxy(
      ProxyType.MOBILE,
    );
    const allProxyMaksMob = await this.proxyMaksService.getAllProxy(
      ProxyTypeMaks.MOBILE,
    );
    return { countCourier, urlCourier, allProxyRez, allProxyMaksRez, allProxyMob, allProxyMaksMob };
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

  @Post('/submitProxyRez')
  async submitProxyRez(@Body('proxy') proxys: string, @Res() res: Response) {
    const proxy = proxys
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.proxyService.createProxy({ proxy, type: ProxyType.RESIDENTIAL });
    return res.redirect('/');
  }

  @Post('/submitProxyMob')
  async submitProxyMob(@Body('proxy') proxys: string, @Res() res: Response) {
    const proxy = proxys
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.proxyService.createProxy({ proxy, type: ProxyType.MOBILE });
    return res.redirect('/');
  }

  @Post('/deleteProxy')
  async deleteProxy(@Body('idProxy') id: string, @Res() res: Response) {
    await this.proxyService.deleteProxy(id);
    return res.redirect('/');
  }

  @Post('/submitProxyMaksRez')
  async submitProxyMaksRez(
    @Body('proxyMaks') proxys: string,
    @Res() res: Response,
  ) {
    const proxy = proxys
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.proxyMaksService.createProxy({
      proxy,
      type: ProxyTypeMaks.RESIDENTIAL,
    });
    return res.redirect('/');
  }

  @Post('/submitProxyMaksMob')
  async submitProxyMaksMob(
    @Body('proxyMaks') proxys: string,
    @Res() res: Response,
  ) {
    const proxy = proxys
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line);
    await this.proxyMaksService.createProxy({
      proxy,
      type: ProxyTypeMaks.MOBILE,
    });
    return res.redirect('/');
  }

  @Post('/deleteProxyMaks')
  async deleteProxyMaks(@Body('idProxyMaks') id: string, @Res() res: Response) {
    await this.proxyMaksService.deleteProxy(id);
    return res.redirect('/');
  }
}
