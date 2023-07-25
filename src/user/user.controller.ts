/* eslint-disable prettier/prettier */
import{Controller, Get ,Post, Put, Delete, Param, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post("/login")
    auth(@Body() user:UserEntity){
        return this.userService.auth(user)
    }

    @Get()
    getAllUsers():Promise<UserEntity[]>{
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() user:UserEntity){
        return this.userService.create(user);
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<UserEntity>{
        return this.userService.findOne(+id)
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() updatedUser: UserEntity){
        return this.userService.update(+id,updatedUser);
    }

    @Delete(":id")
    remove(@Param('id') id: string){
        return this.userService.remove(+id);
    }
}