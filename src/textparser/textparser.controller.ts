import { Controller, Post } from '@nestjs/common';
import { TextparserService } from './textparser.service';

@Controller('textparser')
export class TextparserController {
    constructor(private readonly textService: TextparserService) {}

  @Post()
  async parseHardcodedUrl() {
    return this.textService.fetchAndSave();
  }
}
