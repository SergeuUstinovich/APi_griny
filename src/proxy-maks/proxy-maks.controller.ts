import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProxyMaksService } from './proxy-maks.service';
import { ProxyMaksKeyGuard } from 'src/common/guards/proxy-maks.guard';
import { ProxyTypeMaks } from './proxy-maks-type.enum';

@Controller('proxy-maks')
export class ProxyMaksController {
  constructor(private readonly proxyMaksService: ProxyMaksService) {}

  @UseGuards(ProxyMaksKeyGuard)
  @Get('maxmeego')
  async getNextProxy(@Query('type') type: ProxyTypeMaks = ProxyTypeMaks.RESIDENTIAL) {
    return this.proxyMaksService.getNextProxy(type);
  }
}
