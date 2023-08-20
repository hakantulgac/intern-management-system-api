/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { InternService } from "./intern.service";
import { InternEntity } from "./intern.entity";

interface typeValue{
    value:number
}

@Controller('interns')
export class InternController{
    constructor(private readonly internService: InternService){}

    @Post("sendmail")
    async sendMail(@Body() info:{to:string,subject:string,object:string}): Promise<string> {
        console.log("asdasd")
        try {
            await this.internService.sendMail(
                info.to, // Alıcı e-posta adresi
                info.subject, // E-posta konusu
                info.object // E-posta içeriği
            );
        return 'E-posta gönderildi!';
        } catch (error) {
            console.error('E-posta gönderilemedi: ', error);
            return 'E-posta gönderilemedi!';
        }
    }

    @Put('active/:id')
    putActive(@Param('id') id:string){
        this.internService.putActive(+id)
    }

    @Get()
    async getAllInterns():Promise<InternEntity[]>{
        return await this.internService.findAll();
    }

    @Get('mail/:mail')
    findInternIdByMail(@Param('mail') mail:string):Promise<{id:number}>{
        return this.internService.findInternIdByMail(mail)
    }

    @Get("plan")
    getAllForDetail():Promise<InternEntity[]>{
        return this.internService.findAllForDetail();
    }

    @Get(':id')
    getInternById(@Param("id") id:string):Promise<InternEntity>{
        return this.internService.findOne(+id)
    }

    @Post()
    createIntern(@Body() intern:InternEntity){
        return this.internService.create(intern)
    }

    @Put("completed/:id")
    updateInternCompleted(@Param("id") id:string,@Body() completed:typeValue){
        return this.internService.updateCompleted(+id,completed)
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