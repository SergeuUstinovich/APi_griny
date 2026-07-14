import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  ForbiddenException,
} from '@nestjs/common';
import { MonstroApiService } from './monstro-api.service';
import { ToggleDomainItemDto } from './dto/put-toggle-domains.dto';

@Controller('monstro-api')
export class MonstroApiController {
  constructor(private readonly monstroApiService: MonstroApiService) {}

  @Get('/get-chains')
  getChains() {
    return this.monstroApiService.getChains();
  }

  @Get('/keywords/:project_id')
  getKeywords(@Param('project_id') id: number) {
    return this.monstroApiService.getKeywords(id);
  }

  @Post('/toggle-domains')
  async toggleDomains(
    @Body() dto: ToggleDomainItemDto[],
    @Headers('x-secret-key') key?: string,
  ) {
    if (key !== process.env.TOGGLE_DOMAINS_KEY) {
      throw new ForbiddenException('Неверный ключ доступа');
    }
    // Отдаем сразу ответ
    const response = { message: 'Запрос принят, процесс запущен' };
    setImmediate(async () => {
      try {
        await this.monstroApiService.toggleDomains(dto);
      } catch (e) {
        console.error('Ошибка в фоновом процессе toggleDomains:', e);
      }
    });
    return response;
  }
}
