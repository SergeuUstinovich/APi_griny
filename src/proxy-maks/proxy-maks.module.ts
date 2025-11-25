import { Module } from '@nestjs/common';
import { ProxyMaksService } from './proxy-maks.service';
import { ProxyMaksController } from './proxy-maks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyMaks } from './proxy-maks.entity';

@Module({
  providers: [ProxyMaksService],
  controllers: [ProxyMaksController],
  imports: [TypeOrmModule.forFeature([ProxyMaks])],
  exports: [ProxyMaksService],
})
export class ProxyMaksModule {}
