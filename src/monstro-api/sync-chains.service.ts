import { Injectable } from '@nestjs/common';
import { MonstroApiService } from './monstro-api.service';
import { ProjectResponse } from './interface/project.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Chains } from './chains.entity';
import { Repository } from 'typeorm';
import { Domains } from './domains.entity';
import { Keywords } from './keywords.entity';
import { Keyword } from './interface/keywords.interface';
import { ChainsResponse } from './interface/list-chain.interface';

@Injectable()
export class SyncChainsService {
  constructor(
    private readonly monstroApi: MonstroApiService,
    @InjectRepository(Chains)
    private readonly chainsRepository: Repository<Chains>,
    @InjectRepository(Domains)
    private readonly domainsRepository: Repository<Domains>,
    @InjectRepository(Keywords)
    private readonly keywordsRepository: Repository<Keywords>,
  ) {}

  async syncChains() {
    const groups = await this.monstroApi.getDataGroup();
    let chainsMainDomains: ChainsResponse[] = [];

    try {
      chainsMainDomains = await this.monstroApi.getChainsMainDomains();
    } catch (e) {
      console.error('Ошибка chainsMainDomains');
    }
    const mainDomainMap = new Map<number, string>();
    const lastDomainMap = new Map<number, string>();

    for (const chain of chainsMainDomains) {
      if (chain.data?.length > 0) {
        mainDomainMap.set(chain.id, chain.data[0].Current_domain);

        const last = chain.data[chain.data.length - 1];
        lastDomainMap.set(chain.id, last.Current_domain);
      }
    }
    for (const group of groups.data) {
      try {
        await sleep(2000);
        const projectsResponse: ProjectResponse =
          await this.monstroApi.getDataProject(group.id);

        for (const project of projectsResponse.data) {
          try {
            await sleep(2000);
            const [chainIdStr, domainName] = project.name.split(' - ');

            if (!chainIdStr || !domainName) {
              console.warn(
                `Пропускаем проект с некорректным названием: ${project.name}`,
              );
              continue; // переходим к следующему проекту
            }
            const chainId = Number(chainIdStr.trim());
            const domain = domainName.trim();

            if (isNaN(chainId)) {
              console.warn(
                `Пропускаем проект с некорректным chainId: ${project.name}`,
              );
              continue;
            }
            let keywordsResponse: Keyword[] = [];
            try {
              keywordsResponse = await this.getAllKeywords(project.id);
            } catch (e) {
              console.error(`Ошибка keywords ${project.id}`);
              continue;
            }
            // Проверяем цепочку
            let chain = await this.chainsRepository.findOne({
              where: { chain_id: chainId },
            });
            const mainDomain = mainDomainMap.get(chainId);
            const lastDomain = lastDomainMap.get(chainId);
            if (!chain) {
              chain = this.chainsRepository.create({
                chain_id: chainId,
                name: domain,
                main_domain: mainDomain,
                last_domain: lastDomain,
                created_at: new Date(),
              });
              await this.chainsRepository.save(chain);
            } else {
              let needUpdate = false;

              if (
                mainDomain !== undefined &&
                chain.main_domain !== mainDomain
              ) {
                chain.main_domain = mainDomain;
                needUpdate = true;
              }

              if (
                lastDomain !== undefined &&
                chain.last_domain !== lastDomain
              ) {
                chain.last_domain = lastDomain;
                needUpdate = true;
              }

              if (needUpdate) {
                await this.chainsRepository.save(chain);
              }
            }

            const existingDomain = await this.domainsRepository.findOne({
              where: { chain_id: chainId, project_id: project.id },
            });

            const domainData = {
              chain_id: chainId,
              domain: domain,
              project_id: project.id,
              name: project.name,
              task_type: project.task_type,
              click_regions: project.click_regions,
              power: project.power,
              is_active: project.is_active,
              active_until: project.active_until,
              order: project.order,
              task_link_id: project.task_link_id,
              pws: project.pws,
              monthly_clicks: project.monthly_clicks,
              today_stats: project.today_stats,
              today_plan: project.today_plan,
              updated_at: new Date(),
            };
            let savedDomain;
            if (existingDomain) {
              savedDomain = await this.domainsRepository.save({
                ...existingDomain,
                ...domainData,
              });
            } else {
              const newDomain = this.domainsRepository.create(domainData);
              savedDomain = await this.domainsRepository.save(newDomain);
            }
            const existingKeywords = await this.keywordsRepository.find({
              where: {
                project_id: project.id,
              },
            });
            const existingMap = new Map(
              existingKeywords.map((k) => [k.keyword_id, k]),
            );
            const toSave: Keywords[] = [];
            for (const keyword of keywordsResponse) {
              const existingKeyword = existingMap.get(keyword.id);
              const keywordData = {
                keyword_id: keyword.id,
                project_id: project.id,
                domain_id: savedDomain.id,
                kw: keyword.kw,
                target_page: keyword.target_page,
                last_position: keyword.last_position,
                pws: keyword.pws,
                is_active: keyword.is_active,
                monthly_clicks: keyword.monthly_clicks,
                fixed_clicks: keyword.fixed_clicks,
                lr: keyword.lr,
                notfound_count: keyword.notfound_count,
                auto_boost_amount: keyword.auto_boost_amount,
                auto_boost_period: keyword.auto_boost_period,
                scheduled_clicks: keyword.scheduled_clicks,
                boosted_clicks: keyword.boosted_clicks,
                can_set_task_count: keyword.can_set_task_count,
                today_stats: keyword.today_stats,
              };

              if (existingKeyword) {
                toSave.push({
                  ...existingKeyword,
                  ...keywordData,
                });
              } else {
                toSave.push(this.keywordsRepository.create(keywordData));
              }
            }
            await this.keywordsRepository.save(toSave);
          } catch (e) {
            console.error(`Ошибка проекта ${project.id}`);
            continue;
          }
        }
      } catch (e) {
        console.error(`Ошибка группы ${group.id}`);
        continue;
      }
    }
  }
  private async getAllKeywords(projectId: number) {
    let allKeywords: Keyword[] = [];
    let page = 1;
    let lastPage = 1;

    do {
      const response = await this.monstroApi.getDataKeywords(projectId, page);

      allKeywords.push(...response.data);

      lastPage = response.meta.last_page;
      page++;

      await sleep(1000);
    } while (page <= lastPage);

    return allKeywords;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
