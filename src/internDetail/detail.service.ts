/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
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
    private connection:Connection
  ) {}

  findAll(): Promise<DetailEntity[]> {
    return this.detailRepository.find({ relations: ['intern', 'plan'] });
  }

  findOneIntern(id: number): Promise<DetailEntity[]>{
    return this.detailRepository
      .createQueryBuilder('detail')
      .leftJoinAndSelect('detail.intern', 'intern')
      .leftJoinAndSelect('detail.plan', 'plan')
      .where('detail.intern.id = :id', { id })
      .getMany();
  }

  async createPlanDetail(createdDetailDto: CreateDetailDto): Promise<DetailEntity> {
    
    if(createdDetailDto!==null){
      const plan = await this.planRepository.findOne({
        where: { title: String(createdDetailDto.plan) },
        order: { id: 'DESC' }
      });
      const detail: DetailEntity = new DetailEntity();
      detail.intern = createdDetailDto.intern;
      detail.plan = plan.id;
      detail.startDate = createdDetailDto.startDate;
      detail.endDate = createdDetailDto.endDate;
      detail.done = createdDetailDto.done;
      return this.detailRepository.save(detail);
    }
  }

  async createInternDetail(createdDetailDto: CreateDetailDto): Promise<DetailEntity> {
    
    if(createdDetailDto!==null){
      const intern = await this.internRepository.findOne({
        where: { name: String(createdDetailDto.intern) },
        order: { id: 'DESC' }
      });
      
      const detail: DetailEntity = new DetailEntity();
      detail.intern = intern.id;
      detail.plan = createdDetailDto.plan;
      detail.startDate = createdDetailDto.startDate;
      detail.endDate = createdDetailDto.endDate;
      detail.done = createdDetailDto.done;
      return this.detailRepository.save(detail);
    }
  }

  async update(id: number, updateDetailDto: UpdateDetailDto) {
    const detail: DetailEntity = new DetailEntity();
    detail.intern = updateDetailDto.intern;
    detail.plan = updateDetailDto.plan;
    detail.startDate = updateDetailDto.startDate;
    detail.endDate = updateDetailDto.endDate;
    detail.done = updateDetailDto.done;
    detail.id = id;
    return this.detailRepository.save(detail);
  }

  remove(id: number) {
    const deleted = this.connection.query('delete from detail_entity where "internId" = '+id+'delete from intern_entity where "id" = '+id)
    return deleted;
  }
}
