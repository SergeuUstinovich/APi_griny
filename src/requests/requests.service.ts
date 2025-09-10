import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestsDto } from './dto/create-requests.dto';
import { Requests } from './requests.entity';
import { Projects } from 'src/projects/projects.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private readonly requestsRepository: Repository<Requests>,
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
  ) { }

  async createRequests(dto: CreateRequestsDto, projectId: string) {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Проект не найден');
    }

    const newRequest = this.requestsRepository.create({
      ...dto,
      project: project,
    });
    await this.requestsRepository.save(newRequest);
    return { success: 'Успех' };
  }

  async updateRequests(id: string, dto: Partial<CreateRequestsDto>) {
    const project = await this.requestsRepository.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Запрос не найден');

    const updated = Object.assign(project, dto);
    return await this.requestsRepository.save(updated);
  }

  async deleteRequests(id: string) {
    const result = await this.requestsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Запрос не найден');
    return { message: 'Запрос удалён' };
  }
}
