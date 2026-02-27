import { Module } from '@nestjs/common';
import { ProxyMaksService } from './proxy-maks.service';
import { ProxyMaksController } from './proxy-maks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyMaks } from './proxy-maks.entity';
import { Proxy } from '../proxy/proxy.entity';

@Module({
  providers: [ProxyMaksService],
  controllers: [ProxyMaksController],
  imports: [TypeOrmModule.forFeature([ProxyMaks, Proxy])],
  exports: [ProxyMaksService],
})
export class ProxyMaksModule {}
