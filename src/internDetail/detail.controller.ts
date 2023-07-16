/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DetailService } from "./detail.service";
import { DetailEntity } from "./detail.entity";

@Controller("details")
export class DetailController{
    constructor(private readonly detailService :DetailService){}

    @Get()
    getAllDetails():Promise<DetailEntity[]>{
        return this.detailService.findAll()
    }

    @Get(":id")
    getDetailById(@Param("id") id:string):Promise<DetailEntity[]>{
        return this.detailService.findOneIntern(+id)
    }

    @Post()
    createDetail(@Body() detail:DetailEntity){
        return this.detailService.create(detail)
    }

    @Put(":id")
    updateDetail(@Param("id") id:string, @Body() updatedDetail:DetailEntity){
        return this.detailService.update(+id,updatedDetail)
    }

    @Delete(":id")
    deleteDetail(@Param("id") id:string){
        return this.detailService.remove(+id)
    }
}