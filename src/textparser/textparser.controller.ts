import { Controller, Post } from '@nestjs/common';
import { TextparserService } from './textparser.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from 'src/courier/courier.entity';
import { Repository } from 'typeorm';

@Controller('textparser')
export class TextparserController {
    constructor(private readonly textService: TextparserService, @InjectRepository(Courier)
    private readonly courierRepo: Repository<Courier>) {}

  @Post("courier")
  async parseHardcodedUrl() {
    return this.textService.fetchAndSave({
      fileName: 'courier-url.txt',
      repository: this.courierRepo,
      defaultUrl: 'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv',
    });
  }
}
