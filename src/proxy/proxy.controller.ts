import { Controller, Get } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('next')
  async getNextProxy() {
    return this.proxyService.getNextProxy();
  }
}
