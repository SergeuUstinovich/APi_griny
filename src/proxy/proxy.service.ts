import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Proxy } from './proxy.entity';
import { CreateProxyDto } from './dto/create-proxy.dto';
import { ProxyType } from './proxy-type.enum';
import { ProxyMaks } from 'src/proxy-maks/proxy-maks.entity';

@Injectable()
export class ProxyService {
  private currentIndex = 0;

  constructor(
    @InjectRepository(Proxy)
    private readonly proxyRepo: Repository<Proxy>,
    @InjectRepository(ProxyMaks)
    private readonly proxyMaksRepo: Repository<ProxyMaks>,
  ) {}

  async getNextProxy(type: ProxyType): Promise<string> {
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

  async createProxy(dto: CreateProxyDto) {
    const { proxy, type } = dto;

    // ищем совпадения
    const existing = await this.proxyMaksRepo.find({
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
      this.proxyRepo.create({ proxy: text, type }),
    );

    return await this.proxyRepo.save(entities);

    // return {
    //   added: uniqueProxies,
    //   skipped: existingTexts,
    // };
  }

  // async createProxy(dto: CreateProxyDto) {
  //   const proxys = dto.proxy.map((text) =>
  //     this.proxyRepo.create({ proxy: text, type: dto.type }),
  //   );
  //   return await this.proxyRepo.save(proxys);
  // }

  async getAllProxy(type: ProxyType) {
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
