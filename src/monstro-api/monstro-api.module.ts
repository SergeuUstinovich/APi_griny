import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MonstroApiService } from './monstro-api.service';
import { MonstroApiController } from './monstro-api.controller';
import { SyncChainsService } from './sync-chains.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domains } from './domains.entity';
import { Chains } from './chains.entity';
import { SyncChainsCronService } from './sync-chains-cron.service';
import { Keywords } from './keywords.entity';

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([Chains, Domains, Keywords]),
  ],
  providers: [MonstroApiService, SyncChainsService, SyncChainsCronService],
  exports: [MonstroApiService],
  controllers: [MonstroApiController],
})
export class MonstroApiModule {}
