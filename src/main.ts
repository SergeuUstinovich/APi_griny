import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.PORT || 3000;
  const logger = new Logger(AppModule.name);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  try {
    await app.listen(PORT);
    logger.log(`Приложение работает на порту ${PORT}`);
  } catch (error) {
    logger.error(error);
  }
}
bootstrap();
