import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProxyMaksService } from './proxy-maks.service';
import { ProxyMaksKeyGuard } from 'src/common/guards/proxy-maks.guard';

@Controller('proxy-maks')
export class ProxyMaksController {
  constructor(private readonly proxyMaksService: ProxyMaksService) {}

  @UseGuards(ProxyMaksKeyGuard)
  @Get('maxmeego')
  async getNextProxy() {
    return this.proxyMaksService.getNextProxy();
  }
}
