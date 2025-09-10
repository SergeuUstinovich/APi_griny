import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './projects.entity';
import { Repository } from 'typeorm';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { Requests } from 'src/requests/requests.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    @InjectRepository(Requests)
    private readonly requestRepository: Repository<Requests>,
  ) {}

  async getProjects() {
    const allProjects = await this.projectsRepository.find({
      order: {
        name: 'ASC',
      },
      select: ['id', 'name', 'domain'],
    });
    return allProjects;
  }

  async getProjectById(id: string) {
    return await this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.requests', 'request')
      .where('project.id = :id', { id })
      .orderBy('request.request', 'ASC')
      .getOne();
  }

  async createProjects(dto: CreateProjectsDto) {
    const newProjects = this.projectsRepository.create(dto);
    return await this.projectsRepository.save(newProjects);
  }

  async updateProject(id: string, dto: Partial<CreateProjectsDto>) {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Проект не найден');

    const updated = Object.assign(project, dto);
    return await this.projectsRepository.save(updated);
  }

  async deleteProject(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['requests'],
    });

    if (!project) throw new NotFoundException('Проект не найден');

    // Удаляем связанные requests
    await this.requestRepository.remove(project.requests);

    // Удаляем сам проект
    await this.projectsRepository.remove(project);

    return { message: 'Проект и связанные запросы удалены' };
  }
}
