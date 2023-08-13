/* eslint-disable prettier/prettier */
import { Injectable, Inject } from "@nestjs/common";
import { InternEntity } from "./intern.entity";
import { Repository, Connection } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInternDto } from "./create-intern.dto";
import { UpdateInternDto } from "./update-intern.dto";

@Injectable()
export class InternService{
    constructor(
        @InjectRepository(InternEntity) private readonly internRepository: Repository<InternEntity>,
        @Inject(Connection) private connection?:Connection,
    ) {}

    create(createInternDto: CreateInternDto): Promise<InternEntity>{
        const intern: InternEntity = new InternEntity()
        intern.name = createInternDto.name;
        intern.mail = createInternDto.mail;
        intern.confirmed = createInternDto.confirmed;
        intern.grade = createInternDto.grade
        intern.school = createInternDto.school;
        intern.department = createInternDto.department;
        intern.field = createInternDto.field
        intern.completed = createInternDto.completed
        intern.image = createInternDto.image
        intern.resume = createInternDto.resume
        intern.startdate = createInternDto.startdate
        intern.enddate = createInternDto.enddate
        return this.internRepository.save(intern)
    }

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.email,
              pass: process.env.emailPassword, 
            },
        });
    
        await transporter.sendMail({
            from: 'odevicin_@outlook.com', 
            to,
            subject,
            text: body,
        });
    }

    async findAll():Promise<InternEntity[]>{
        const result =  await this.connection.query('SELECT * FROM intern_entity')
        return result;
    }

    findInternIdByMail(mail:string):Promise<{id:number}>{
        const result = this.connection.query(
            `select id from intern_entity
             where mail = '${mail}'`
        )
        return result
    }

    findAllForDetail():Promise<{id:number}[]>{
        const result = this.connection.query('select id from intern_entity')
        console.log(result)
        return result;
    }

    findOne(id: number){
        return this.internRepository.findOneById(id)
    }

    updateCompleted(id:number , completed:{value:number}):Promise<{value:number}>{
        const result:number = completed.value
        return this.connection.query("update intern_entity set completed = "+result+" where id = "+id)
         
    }

    update(id:number , updateInternDto: UpdateInternDto){
        const intern: InternEntity = new InternEntity()
        intern.name = updateInternDto.name;
        intern.mail = updateInternDto.mail;
        intern.confirmed = updateInternDto.confirmed;
        intern.grade = updateInternDto.grade
        intern.school = updateInternDto.school;
        intern.department = updateInternDto.department;
        intern.field = updateInternDto.field
        intern.completed = updateInternDto.completed
        intern.image = updateInternDto.image
        intern.resume = updateInternDto.resume
        intern.startdate = updateInternDto.startdate
        intern.enddate = updateInternDto.enddate
        intern.id = id
        return this.internRepository.save(intern)
    }

    remove(id: number){
        const deleted = this.internRepository.findOneById(id)
        this.internRepository.delete(id)
        return deleted
    }

}