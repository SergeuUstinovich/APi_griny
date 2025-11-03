import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proxy } from './proxy.entity';

@Module({
  providers: [ProxyService],
  controllers: [ProxyController],
  imports: [
      TypeOrmModule.forFeature([Proxy]),
  ],
  exports: [ProxyService]
})
export class ProxyModule {}
