import { forwardRef, Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from 'src/projects/projects.module';
import { Projects } from 'src/projects/projects.entity';
import { Requests } from 'src/requests/requests.entity'

@Module({
  providers: [RequestsService],
  controllers: [RequestsController],
  imports: [
    TypeOrmModule.forFeature([Requests, Projects]),
    forwardRef(() => ProjectsModule),
  ],
})
export class RequestsModule {}
