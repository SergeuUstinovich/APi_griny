import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProxyMaks } from './proxy-maks.entity';
import { CreateProxyMaksDto } from './dto/create-proxy-maks.dto';
import { ProxyTypeMaks } from './proxy-maks-type.enum';

@Injectable()
export class ProxyMaksService {
  private currentIndex = 0;
  constructor(
    @InjectRepository(ProxyMaks)
    private readonly proxyRepo: Repository<ProxyMaks>,
  ) {}

  async getNextProxy(type: ProxyTypeMaks): Promise<string> {
    const proxies = await this.proxyRepo.find({
      where: { type },
      order: { createdAt: 'ASC' },
    });

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

  async createProxy(dto: CreateProxyMaksDto) {
    const proxys = dto.proxy.map((text) =>
      this.proxyRepo.create({ proxy: text, type: dto.type }),
    );
    return await this.proxyRepo.save(proxys);
  }

  async getAllProxy(type: ProxyTypeMaks) {
      return await this.proxyRepo.find({
        where: { type },
      });
    }

  async deleteProxy(id: string) {
    const proxy = await this.proxyRepo.findOne({
      where: { id },
    });

    if (!proxy) throw new NotFoundException('Прокси не найдет');

    await this.proxyRepo.remove(proxy);

    return { message: 'Прокси удален' };
  }
}
