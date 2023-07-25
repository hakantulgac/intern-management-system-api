/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PlanService } from "./plan.service";
import { PlanEntity } from "./plan.entity";

@Controller("plans")
export class PlanController{
    constructor(private readonly planService: PlanService){}
    
    @Get()
    getAll():Promise<PlanEntity[]>{
        return this.planService.findAll();
    }

    @Get("intern")
    getAllForIntern():Promise<{id:number}[]>{
        return this.planService.findAllForIntern();
    }

    @Post()
    create(@Body() plan:PlanEntity):Promise<PlanEntity>{
        return this.planService.create(plan);
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<PlanEntity>{
        return this.planService.findOne(+id)
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() updatedUser: PlanEntity){
        return this.planService.update(+id,updatedUser);
    }

    @Delete(":id")
    remove(@Param('id') id: string){
        return this.planService.remove(+id);
    }
}