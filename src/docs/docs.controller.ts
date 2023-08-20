/* eslint-disable prettier/prettier */
import{Controller, Get ,Post, Put, Delete, Param, Body} from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsEntity } from './docs.entity';

@Controller('docs')
export class DocsController {
    constructor(private readonly docsService: DocsService){}

    @Post()
    createUser(@Body() docs:DocsEntity){
        return this.docsService.create(docs);
    }

    @Get()
    findAll(): Promise<DocsEntity[]>{
        return this.docsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<DocsEntity>{
        return this.docsService.findOne(+id)
    }

    @Get('intern/:id')
    findOneByIntern(@Param('id') id:string):Promise<DocsEntity[]>{
        return this.docsService.finOneByIntern(+id)
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() updatedDocs: DocsEntity){
        return this.docsService.update(+id,updatedDocs);
    }

    @Delete(":id")
    remove(@Param('id') id: string){
        return this.docsService.remove(+id);
    }
}