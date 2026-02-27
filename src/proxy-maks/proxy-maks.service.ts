import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProxyMaks } from './proxy-maks.entity';
import { CreateProxyMaksDto } from './dto/create-proxy-maks.dto';
import { Proxy } from '../proxy/proxy.entity';
import { BadRequestException } from '@nestjs/common';
import { ProxyType } from 'src/proxy/proxy-type.enum';

@Injectable()
export class ProxyMaksService {
  private currentIndex = 0;
  constructor(
    @InjectRepository(ProxyMaks)
    private readonly proxyMaksRepo: Repository<ProxyMaks>,
    @InjectRepository(Proxy)
    private readonly proxyRepo: Repository<Proxy>,
  ) {}

  async getNextProxy(type: ProxyType): Promise<string> {
    const proxies = await this.proxyMaksRepo.find({
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
    const { proxy, type } = dto;

    // ищем совпадения
    const existing = await this.proxyRepo.find({
      where: {
        type,
        proxy: In(proxy),
      },
    });

    const existingTexts = existing.map((p) => p.proxy);

    // фильтруем только новые
    const uniqueProxies = proxy.filter((text) => !existingTexts.includes(text));

    if (!uniqueProxies.length) {
      throw new BadRequestException('Все прокси уже существуют');
    }

    const entities = uniqueProxies.map((text) =>
      this.proxyMaksRepo.create({ proxy: text, type }),
    );

    return await this.proxyMaksRepo.save(entities);

    // return {
    //   added: uniqueProxies,
    //   skipped: existingTexts,
    // };
  }

  // async createProxy(dto: CreateProxyMaksDto) {
  //   const proxys = dto.proxy.map((text) =>
  //     this.proxyMaksRepo.create({ proxy: text, type: dto.type }),
  //   );
  //   return await this.proxyMaksRepo.save(proxys);
  // }

  async getAllProxy(type: ProxyType) {
    return await this.proxyMaksRepo.find({
      where: { type },
    });
  }

  async deleteProxy(id: string) {
    const proxy = await this.proxyMaksRepo.findOne({
      where: { id },
    });

    if (!proxy) throw new NotFoundException('Прокси не найдет');

    await this.proxyMaksRepo.remove(proxy);

    return { message: 'Прокси удален' };
  }
}
