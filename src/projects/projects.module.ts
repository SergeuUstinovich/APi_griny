import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { RequestsModule } from 'src/requests/requests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './projects.entity';
import { Requests } from 'src/requests/requests.entity'

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
      TypeOrmModule.forFeature([Requests, Projects]),
      forwardRef(() => RequestsModule),
    ],
})
export class ProjectsModule {}
