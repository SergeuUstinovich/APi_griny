import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectsDto } from './dto/create-projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  createProjects(@Body() dto: CreateProjectsDto) {
    return this.projectsService.createProjects(dto);
  }

  @Put(':id')
  updateProject(
    @Param('id') id: string,
    @Body() dto: Partial<CreateProjectsDto>,
  ) {
    return this.projectsService.updateProject(id, dto);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
