import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierModule } from './courier/courier.module';
import { TextparserModule } from './textparser/textparser.module';
import { ProjectsModule } from './projects/projects.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV === 'development' ? `.env.${process.env.NODE_ENV}` : '.env'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      autoLoadEntities: true,
    }),
    CourierModule,
    TextparserModule,
    ProjectsModule,
    RequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
