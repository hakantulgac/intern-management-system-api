/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateInternDto } from './create-intern.dto';

export class UpdateInternDto extends PartialType(CreateInternDto){
    name:string
    grade:number
    school:string
    department:string
    field:string
    completed:number
    img: Buffer;
    cv: Buffer;
}