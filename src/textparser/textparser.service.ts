import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';

interface ParserConfig {
  fileName: string;
  repository: Repository<any>;
  defaultUrl?: string;
}

@Injectable()
export class TextparserService {
  constructor(private readonly httpService: HttpService) {}
  
    private loadUrlFromFile(filePath: string, defaultUrl: string): string {
      try {
        return fs.readFileSync(filePath, 'utf-8').trim();
      } catch (err) {
        fs.writeFileSync(filePath, defaultUrl);
        return defaultUrl;
      }
    }
  
    private saveUrlToFile(filePath: string, url: string) {
      fs.writeFileSync(filePath, url);
    }
  
    async fetchAndSave(config: ParserConfig) {
      const filePath = path.join(__dirname, config.fileName);
      const url = this.loadUrlFromFile(
        filePath,
        config.defaultUrl ||
          'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv',
      );
  
      try {
        const { data, status } = await firstValueFrom(
          this.httpService.get(url, { timeout: 10000 }),
        );
  
        if (status === 404 || !data) {
          throw new NotFoundException('URL не найден или не вернул данные');
        }
  
        const $ = cheerio.load(data);
        const bodyText = $('body').text().trim();
  
        const entry = config.repository.create({ request: bodyText });
        return await config.repository.save(entry);
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
  
    setTargetUrl(fileName: string, url: string) {
      if (!url || !url.startsWith('http')) {
        throw new NotFoundException('Некорректный URL');
      }
      const filePath = path.join(__dirname, fileName);
      this.saveUrlToFile(filePath, url);
    }

    getTargetUrl(filePath: string, defaultUrl: string) {
      const file = path.join(__dirname, filePath);
      return this.loadUrlFromFile(file, defaultUrl)
    }
}
