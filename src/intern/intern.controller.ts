/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { InternService } from "./intern.service";
import { InternEntity } from "./intern.entity";

@Controller('interns')
export class InternController{
    constructor(private readonly internService: InternService){}

    @Get()
    getAllInterns():Promise<InternEntity[]>{
        return this.internService.findAll();
    }

    @Get(':id')
    getInternById(@Param("id") id:string):Promise<InternEntity>{
        return this.internService.findOne(+id)
    }

    @Post()
    createIntern(@Body() intern:InternEntity){
        return this.internService.create(intern)
    }

    @Put(":id")
    updateIntern(@Param("id") id:string, @Body() updatedIntern:InternEntity){
        return this.internService.update(+id,updatedIntern)
    }

    @Delete(":id")
    deleteIntern(@Param("id") id:string){
        return this.internService.remove(+id)
    }
}