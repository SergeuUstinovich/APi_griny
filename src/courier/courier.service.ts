import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GetCourierDto } from './dto/get-params-courier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Courier } from './courier.entity';

@Injectable()
export class CourierService {
  constructor(
    @InjectRepository(Courier)
    private readonly courierRepository: Repository<Courier>,
  ) {}

  async getCourier(dto: GetCourierDto) {
    const { pid, server, lr } = dto;

    if (pid === undefined || !server || !lr) {
      throw new BadRequestException('Необходимо ввести квери параметры');
    }

    const [courier] = await this.courierRepository.find({
        take: 1, 
    });

    if (!courier) {
      throw new NotFoundException('Запись не найдена');
    }

    await this.courierRepository.remove(courier);

    return courier;
  }

  async createCourier(text: string) {
    const courier = this.courierRepository.create({ request: text });
    return await this.courierRepository.save(courier);
  }

  async getCourierCount(): Promise<number> {
    return await this.courierRepository.count();
  }
}
