import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SyncChainsService } from './sync-chains.service';

@Injectable()
export class SyncChainsCronService {
  constructor(private readonly syncChainsService: SyncChainsService) {}

  @Cron('10 * * * *')
  async handleCron() {
    console.log('Запуск синхронизации цепочек раз в час');
    await this.syncChainsService.syncChains();
    console.log('Конец');
  }
}