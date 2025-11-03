import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { TextparserService } from './textparser.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Courier } from 'src/courier/courier.entity';

@Injectable()
export class DynamicRequestService {
  constructor(
    private readonly textService: TextparserService,
    @InjectRepository(Courier)
    private readonly courierRepo: Repository<Courier>,
  ) {}

  @Interval(10000)
  async courierAutoRequest() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    return this.textService.fetchAndSave({
      fileName: 'courier-url.txt',
      repository: this.courierRepo,
      defaultUrl:
        'https://topsbor.com/get-interest-query/BLhhWspLgFAHTX64QVdiqZKv',
    });
  }
}
