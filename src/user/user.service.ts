/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from "./user.entity";
import { createUserDto } from "./create-user.dto";
import { UpdatedUserDto } from "./update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async auth(authInfos: createUserDto):Promise<object>{
        try {
            const userInfos = await this.userRepository.findOne({where:{name:String(authInfos.name)}})
            const check = userInfos.name==authInfos.name && userInfos.password == authInfos.password

            if(check){
                return Promise.resolve({id:userInfos.id})
            }else{
                return Promise.reject({message:"error"})
            }
        }catch{
            return Promise.reject({message:"error"})
        }  
    }

    create(createUserDto: createUserDto): Promise<UserEntity>{
        const user : UserEntity = new UserEntity();
        user.name = createUserDto.name;
        user.password = createUserDto.password;
        return this.userRepository.save(user)
    }

    findAll():Promise<UserEntity[]>{
        return this.userRepository.find()
    }

    findOne(id:number){
        return this.userRepository.findOneById(id)
    }
    
    update(id:number , updateUserDto: UpdatedUserDto){
        const user : UserEntity = new UserEntity();
        user.name = updateUserDto.name;
        user.password = updateUserDto.password;
        user.id = id
        return this.userRepository.save(user)
    }

    remove(id: number){
        const deleted = this.userRepository.findOneById(id)
        this.userRepository.delete(id)
        return deleted
    }

}