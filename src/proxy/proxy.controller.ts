import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyKeyGuard } from 'src/common/guards/proxy.guard';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @UseGuards(ProxyKeyGuard)
  @Get('next')
  async getNextProxy() {
    return this.proxyService.getNextProxy();
  }
}
