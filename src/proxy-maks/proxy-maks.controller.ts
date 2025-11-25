import { Controller, Get } from '@nestjs/common';
import { ProxyMaksService } from './proxy-maks.service';

@Controller('proxy-maks')
export class ProxyMaksController {
  constructor(private readonly proxyMaksService: ProxyMaksService) {}

  @Get('maxmeego')
  async getNextProxy() {
    return this.proxyMaksService.getNextProxy();
  }
}
