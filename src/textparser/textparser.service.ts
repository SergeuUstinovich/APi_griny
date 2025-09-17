import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from 'src/courier/courier.entity';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';
import { Interval } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TextparserService {
  private readonly filePath = path.join(__dirname, 'target-url.txt');
  private targetUrl: string;
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
  ) {
    this.targetUrl = this.loadUrlFromFile();
  }

  private loadUrlFromFile(): string {
    try {
      return fs.readFileSync(this.filePath, 'utf-8').trim();
    } catch (err) {
      const defaultUrl =
        'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv';
      fs.writeFileSync(this.filePath, defaultUrl);
      return defaultUrl;
    }
  }

  @Interval(10000)
  async fetchAndSave() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    try {
      const url = this.getTargetUrl();
      const { data, status } = await firstValueFrom(
        this.httpService.get(url, { timeout: 10000 }),
      );

      if (status === 404 || !data) {
        throw new NotFoundException('URL не найден или не вернул данные');
      }

      const $ = cheerio.load(data);
      const bodyText = $('body').text().trim();
      const entry = this.courierRepository.create({ request: bodyText });
      return await this.courierRepository.save(entry);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        `Ошибка при парсинге: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private saveUrlToFile(url: string) {
    fs.writeFileSync(this.filePath, url);
  }

  setTargetUrl(url: string) {
    if (!url || !url.startsWith('http')) {
      throw new NotFoundException('Некорректный URL');
    }
    this.targetUrl = url;
    this.saveUrlToFile(url);
  }

  getTargetUrl(): string {
    return this.targetUrl;
  }
}
