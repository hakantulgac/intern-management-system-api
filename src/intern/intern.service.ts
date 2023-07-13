/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InternEntity } from "./intern.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInternDto } from "./create-intern.dto";
import { UpdateInternDto } from "./update-intern.dto";

@Injectable()
export class InternService{
    constructor(@InjectRepository(InternEntity) private readonly internRepository: Repository<InternEntity>) {}

    create(createInternDto: CreateInternDto): Promise<InternEntity>{
        const intern: InternEntity = new InternEntity()
        intern.name = createInternDto.name;
        intern.grade = createInternDto.grade
        intern.school = createInternDto.school;
        intern.department = createInternDto.department;
        intern.field = createInternDto.field
        intern.completed = createInternDto.completed
        return this.internRepository.save(intern)
    }

    findAll():Promise<InternEntity[]>{
        return this.internRepository.find()
    }

    findOne(id: number){
        return this.internRepository.findOneById(id)
    }

    update(id:number , updateInternDto: UpdateInternDto){
        const intern: InternEntity = new InternEntity()
        intern.name = updateInternDto.name;
        intern.grade = updateInternDto.grade
        intern.school = updateInternDto.school;
        intern.department = updateInternDto.department;
        intern.field = updateInternDto.field
        intern.completed = updateInternDto.completed
        intern.id = id
        return this.internRepository.save(intern)
    }

    remove(id: number){
        const deleted = this.internRepository.findOneById(id)
        this.internRepository.delete(id)
        return deleted
    }

}