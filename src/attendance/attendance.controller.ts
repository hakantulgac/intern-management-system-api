/* eslint-disable prettier/prettier */
import{Controller, Get ,Post, Put, Delete, Param, Body} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceEntity } from './attendance.entity';

interface typeNote{
    internid:string
    date:string
    note:string
}

@Controller('attendances')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService){}

    @Post()
    createUser(@Body() attendance:AttendanceEntity){
        return this.attendanceService.create(attendance);
    }

    @Get()
    findAll(): Promise<AttendanceEntity[]>{
        return this.attendanceService.findAll()
    }

    @Put('note')
    createNote(@Body() newNote:typeNote){
        this.attendanceService.createNote(newNote.note,+newNote.internid,newNote.date)
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<AttendanceEntity>{
        return this.attendanceService.findOne(+id)
    }

    @Get('intern/:id')
    findOneByIntern(@Param('id') id:string):Promise<AttendanceEntity[]>{
        return this.attendanceService.finOneByIntern(+id)
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() updatedAttendance: AttendanceEntity){
        return this.attendanceService.update(+id,updatedAttendance);
    }

    @Delete(":id/:date")
    remove(@Param('id') id: string,@Param('date') date:string){
        return this.attendanceService.remove(+id,date);
    }
}