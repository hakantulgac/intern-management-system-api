/* eslint-disable prettier/prettier */
import{Controller, Get ,Post, Put, Delete, 
    Param, Body, Res, Req, UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import {Response,Request} from 'express'
import { JwtService } from "@nestjs/jwt"

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService,private jwtService : JwtService){}

    @Post("/login")
    async login(@Body() user:UserEntity,@Res({passthrough:true}) response:Response){
        try {
            const result = await this.userService.login(user)
            const check = result 
                && result.password == user.password 
                && result.role == user.role
                
            if(check){
                const jwt = await this.jwtService.signAsync({id:result.id})
                response.cookie("jwt",jwt,{httpOnly:true})
                const {password,...rest} = result
                return rest
            }else{
                return Promise.reject({message:"error"})
            }
        } catch (e) {
            return Promise.reject({message:"error"})
        }
    }

    @Get("auth")
    async auth(@Req() req:Request){
        try {
            const cookie = req.cookies['jwt']

            const data = await this.jwtService.verifyAsync(cookie)
            const user = await this.userService.findOne(data['id'])

            const {password,...rest} = user
            if(user){
                return rest
            }else{
                throw new UnauthorizedException();
            }
        } catch (e) {
            throw new UnauthorizedException();
        }   
    }

    @Post("logout")
    logout(@Res({passthrough:true}) response:Response){
        response.clearCookie('jwt')
        return {message:"success"}
    }


    @Get("/mail/:mail")
    getId(@Param('mail') mail:string):Promise<{id:string}>{
        return this.userService.findId(mail);
    }

    @Get()
    getAllUsers():Promise<UserEntity[]>{
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() user:UserEntity){
        const newUser = this.userService.create(user);
        const {password,...rest} = user
        return rest
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<UserEntity>{
        return this.userService.findOne(+id)
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() updatedUser: UserEntity){
        return this.userService.update(+id,updatedUser);
    }

    @Delete(":name")
    remove(@Param('name') name: string){
        return this.userService.remove(name);
    }
}