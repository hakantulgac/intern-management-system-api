/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailEntity } from './detail.entity';
import { CreateDetailDto } from './create-detail.dto';
import { UpdateDetailDto } from './update-detail.dto';
import { InternEntity } from 'src/intern/intern.entity';
import { PlanEntity } from 'src/plan/plan.entity';

@Injectable()
export class DetailService {
  constructor(
    @InjectRepository(DetailEntity)
    private readonly detailRepository: Repository<DetailEntity>,
    @InjectRepository(InternEntity)
    private readonly internRepository: Repository<InternEntity>,
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}

  findAll(): Promise<DetailEntity[]> {
    return this.detailRepository.find({ relations: ['intern', 'plan'] });
  }

  findOne(id: number) {
    return this.detailRepository
      .createQueryBuilder('detail')
      .leftJoinAndSelect('detail.intern', 'intern')
      .leftJoinAndSelect('detail.plan', 'plan')
      .where('detail.id = :id', { id })
      .getOne();
  }

  async create(createdDetailDto: CreateDetailDto): Promise<DetailEntity> {
    const intern = await this.internRepository.findOne({
      where: { name: String(createdDetailDto.intern) },
    });
    const plan = await this.planRepository.findOne({
      where: { title: String(createdDetailDto.plan) },
    });

    const detail: DetailEntity = new DetailEntity();
    detail.intern = intern.id;
    detail.plan = plan.id;
    detail.startDate = createdDetailDto.startDate;
    detail.endDate = createdDetailDto.endDate;
    detail.done = createdDetailDto.done;
    return this.detailRepository.save(detail);
  }

  async update(id: number, updateDetailDto: UpdateDetailDto) {
    const intern = await this.internRepository.findOne({
      where: { name: String(updateDetailDto.intern) },
    });
    const plan = await this.planRepository.findOne({
      where: { title: String(updateDetailDto.plan) },
    });

    const detail: DetailEntity = new DetailEntity();
    detail.intern = intern.id;
    detail.plan = plan.id;
    detail.startDate = updateDetailDto.startDate;
    detail.endDate = updateDetailDto.endDate;
    detail.done = updateDetailDto.done;
    detail.id = id;
    return this.detailRepository.save(detail);
  }

  remove(id: number) {
    const deleted = this.detailRepository.findOneById(id);
    this.detailRepository.delete(id);
    return deleted;
  }
}
