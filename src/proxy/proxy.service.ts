import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proxy } from './proxy.entity';
import { CreateProxyDto } from './dto/create-proxy.dto';

@Injectable()
export class ProxyService {
  private currentIndex = 0;

  constructor(
    @InjectRepository(Proxy)
    private readonly proxyRepo: Repository<Proxy>,
  ) {}

  async getNextProxy(): Promise<string> {
    const proxies = await this.proxyRepo.find({ order: { createdAt: 'ASC' } });

    if (!proxies.length) {
      throw new NotFoundException('Нет доступных прокси в базе данных');
    }

    // если дошли до конца списка — начинаем заново
    if (this.currentIndex >= proxies.length) {
      this.currentIndex = 0;
    }

    const proxy = proxies[this.currentIndex];
    this.currentIndex++;

    return proxy.proxy;
  }

  async createProxy(dto: CreateProxyDto) {
    const newProxy = this.proxyRepo.create(dto);
    return await this.proxyRepo.save(newProxy);
  }

  async getAllProxy() {
    return await this.proxyRepo.find()
  }
}
