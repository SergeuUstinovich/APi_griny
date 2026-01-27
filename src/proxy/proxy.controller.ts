import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyKeyGuard } from 'src/common/guards/proxy.guard';
import { ProxyType } from './proxy-type.enum';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @UseGuards(ProxyKeyGuard)
  @Get('next')
  async getNextProxy(@Query('type') type: ProxyType = ProxyType.RESIDENTIAL) {
    return this.proxyService.getNextProxy(type);
  }
}
