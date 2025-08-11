import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  const logger = new Logger(AppModule.name);

  app.enableCors({
    origin: ['https://100ftdperday.club'],
  });

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  try {
    await app.listen(PORT, HOST);
    logger.log(`Приложение работает на порту ${PORT}`);
  } catch (error) {
    logger.error(error);
  }
}
bootstrap();
