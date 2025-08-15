import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from 'src/courier/courier.entity';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class TextparserService {
    constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
  ) {}

  @Interval(10000)
  async fetchAndSave() {
    const url = 'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv';

    const { data } = await firstValueFrom(this.httpService.get(url));
    const $ = cheerio.load(data);
    const bodyText = $('body').text().trim();

    const entry = this.courierRepository.create({ request: bodyText });
    return this.courierRepository.save(entry);
  }
}
