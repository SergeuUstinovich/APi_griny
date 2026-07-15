import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GroupProjectResponse } from './interface/group-project.interface';
import { ProjectResponse } from './interface/project.interface';
import { KeywordsResponse } from './interface/keywords.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Chains } from './chains.entity';
import { Repository } from 'typeorm';
import { Keywords } from './keywords.entity';
import { ChainsResponse } from './interface/list-chain.interface';
import { Domains } from './domains.entity';
import { ToggleDomainItemDto } from './dto/put-toggle-domains.dto';
import { retry, timer, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILike } from 'typeorm';

type ToggleResult = {
  domain: string;
  projectId?: number;
  success: boolean;
  error?: string;
  info?: string;
};

@Injectable()
export class MonstroApiService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Chains)
    private readonly chainsRepository: Repository<Chains>,
    @InjectRepository(Keywords)
    private readonly keywordsRepository: Repository<Keywords>,
    @InjectRepository(Domains)
    private readonly domainsRepository: Repository<Domains>,
  ) {}

  async getChains() {
    const allChains = await this.chainsRepository.find({
      relations: ['domains'],
      select: {
        id: true,
        chain_id: true,
        main_domain: true,
        last_domain: true,
        domains: {
          id: true,
          project_id: true,
          domain: true,
          monthly_clicks: true,
          today_stats: true,
          today_plan: true,
          added_at: true,
          updated_at: true,
        },
      },
      order: {
        id: 'ASC',
      },
    });
    return allChains;
  }

  async getKeywords(projectId: number) {
    return await this.keywordsRepository.find({
      where: { project_id: projectId },
      select: {
        id: true,
        kw: true,
        target_page: true,
        last_position: true,
        is_active: true,
        monthly_clicks: true,
        fixed_clicks: true,
        today_stats: true,
        added_at: true,
        updated_at: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  private isProcessing = false;

  async toggleDomains(dto: ToggleDomainItemDto[]) {
    if (this.isProcessing) {
      return {
        total: dto.length,
        results: dto.map((item) => ({
          domain: item.domain,
          success: false,
          error: 'Процесс уже выполняется',
        })),
      };
    }
    this.isProcessing = true;
    const results: ToggleResult[] = [];
    try {
      for (const item of dto) {
        const { domain, isActive } = item;
        const domainEntities = await this.domainsRepository.find({
          where: [{ domain: ILike(domain) }, { domain: ILike(`${domain} %`) }],
        });
        if (domainEntities.length === 0) {
          results.push({
            domain,
            success: false,
            error: 'Домен не найден',
          });
          continue;
        }

        for (const entity of domainEntities) {
          try {
            // if (entity.is_active === isActive) {
            //   results.push({
            //     domain: entity.domain,
            //     projectId: entity.project_id,
            //     success: true,
            //     info: `Уже находится в статусе ${isActive ? 'включен' : 'выключен'}`,
            //   });
            //   continue; // Пропускаем sleep(2050) и запрос к внешнему API
            // }
            await this.putIsActiveProject(entity.project_id, isActive);
            await this.domainsRepository.update(entity.id, {
              is_active: isActive,
            });
            //поддержка сказала 60 запросов в минуту
            await this.sleep(2050);

            results.push({
              domain: entity.domain,
              projectId: entity.project_id,
              success: true,
            });
          } catch (e: any) {
            results.push({
              domain: entity.domain,
              projectId: entity.project_id,
              success: false,
              error: e.message,
            });
          }
        }
      }
    } finally {
      this.isProcessing = false;
    }
    return {
      total: results.length,
      results,
    };
  }

  private async putIsActiveProject(projectId: number, isActive: boolean) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(
          `https://monstro.ru/api/projects/${projectId}`,
          {
            is_active: isActive,
          },
          {
            headers: {
              'x-api-key': process.env.XAPIKEYMONSTRO,
            },
          },
        ),
      );

      if (!response.data?.success) {
        throw new Error(
          `Ошибка API: ${response.data?.message || 'unknown error'}`,
        );
      }

      return response.data;
    } catch (error: any) {
      const status = error.response?.status;

      if (status === 422) {
        throw new Error(
          `Ошибка валидации: ${JSON.stringify(error.response.data.errors)}`,
        );
      } else if (status === 404) {
        throw new Error('Проект не найден');
      } else if (status === 500) {
        throw new Error('Ошибка сервера API');
      } else {
        throw new Error(`Ошибка запроса: ${error.message}`);
      }
    }
  }

  async getChainsMainDomains(): Promise<ChainsResponse[]> {
    const response = await firstValueFrom(
      this.httpService
        .get('https://api.dephub.dev/api/list_of_chain/', {
          headers: { 'DOP-Key': process.env.DOPKEYLISTCHAINS },
        })
        .pipe(
          retry({
            count: 3,
            delay: (error, retryCount) => {
              console.warn(
                `Попытка ${retryCount} не удалась (ошибка ${error.response?.status}). Ретрай...`,
              );
              return timer(retryCount * 2000);
            },
          }),
          catchError((err) => {
            console.error('Все попытки получить ChainsMainDomains исчерпаны');
            return throwError(() => err);
          }),
        ),
    );
    return response.data;
  }

  async getDataGroup(): Promise<GroupProjectResponse> {
    return this.handleRequest<GroupProjectResponse>(
      'https://monstro.ru/api/task_links',
    );
  }

  async getDataProject(projectGroupId: number): Promise<ProjectResponse> {
    return this.handleRequest<ProjectResponse>(
      `https://monstro.ru/api/task_links/${projectGroupId}/projects`,
    );
  }

  async getDataKeywords(
    projectId: number,
    page = 1,
  ): Promise<KeywordsResponse> {
    return this.handleRequest<KeywordsResponse>(
      `https://monstro.ru/api/projects/${projectId}/keywords?page=${page}`,
    );
  }

  private async handleRequest<T>(url: string): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, {
          headers: { 'x-api-key': process.env.XAPIKEYMONSTRO },
        }),
      );

      if (!(response.data as any)?.success) {
        const errors = (response.data as any)?.errors
          ? JSON.stringify((response.data as any).errors)
          : '';
        throw new Error(
          `API вернул неуспешный ответ: ${(response.data as any).message} ${errors}`,
        );
      }

      if (!(response.data as any).data) {
        throw new Error('API вернул пустое поле data');
      }

      return response.data;
    } catch (error: any) {
      const status = error.response?.status;

      if (status === 422) {
        throw new Error(
          `Ошибка валидации запроса: ${JSON.stringify(error.response.data.errors)}`,
        );
      } else if (status === 404) {
        throw new Error('Ресурс не найден');
      } else if (status === 500) {
        throw new Error('Серверная ошибка API');
      } else if ((error.response?.data as any)?.message) {
        throw new Error(`Ошибка API: ${(error.response?.data as any).message}`);
      } else {
        throw new Error(`Неизвестная ошибка запроса: ${error.message}`);
      }
    }
  }
  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
