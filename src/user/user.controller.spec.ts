/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { UserEntity } from "./user.entity"
import { Request,Response } from "express"
import { JwtService } from "@nestjs/jwt"

describe('UserController',()=>{
    let userService : UserService
    let userController : UserController
    let userConnection : Connection
    let userRepository : Repository<UserEntity>
    let jwtService : JwtService
    let req : Request
    let res : Response
    beforeEach(()=>{
        userService = new UserService(userRepository,userConnection)
        userController = new UserController(userService,jwtService)
        req = {
          headers: {},
          cookies: { jwt: 'your_jwt_token_here' },
        } as Request;
    })

    describe("auth",()=>{
        it("Should be login",async()=>{
            const user : UserEntity = {id:0,name:"sada",password:"",role:"",field:""} 

            jest.spyOn(userService,"login").mockResolvedValue(user)

            const result = await userController.login({id:0,name:"sada",password:"",role:"",field:""},res)

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {password,...rest} = user
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {jwt,...restResult} = result

            expect(restResult).toEqual(rest)
        })
    })

    describe("getAllUsers",()=>{
        it("Should return an array of users",async()=>{
            const users : UserEntity[] = [
                {id:1,name:"dsad",password:"dfsdf",role:"",field:""},
                {id:2,name:"asda",password:"adasd",role:"",field:""}
            ]
            
            jest.spyOn(userService,"findAll").mockResolvedValue(users)

            const result = await userController.getAllUsers(req)
            expect(result).toEqual(users)
        })
    })

    describe("createUser",()=>{
        it("Should create a user",async()=>{
            const user: UserEntity = {id:1,name:"dsad",password:"dfsdf",role:"",field:""}

            jest.spyOn(userService,"create").mockResolvedValue(user)

            const result = await userController.createUser(req,user)
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {password,...rest} = user
            
            expect(result).toEqual(rest)
        })
    })

    describe("findOne",()=>{
        it("Should return an item of users",async()=>{
            const user: UserEntity = {id:1,name:"dsad",password:"dfsdf",role:"",field:""}

            jest.spyOn(userService,"findOne").mockResolvedValue(user)

            const result = await userController.findOne(req,"2")
            
            expect(result).toEqual(user)
        })
    })

    describe("update",()=>{
        it("Should update an user",async()=>{
            const user : UserEntity = {id:1,name:"saada",password:"sadasd",role:"",field:""}

            jest.spyOn(userService,"update").mockResolvedValue(user)

            const result = await userController.update(req,"1",user)
            expect(result).toEqual(user)
        })
    })

    describe("remove",()=>{
        it("Should delete an user",async()=>{
            const user : UserEntity = {id:1,name:"saada",password:"sadasd",role:"",field:""}

            jest.spyOn(userService,"remove").mockResolvedValue(user)

            const result = await userController.remove(req,"1")
            expect(result).toEqual(user)
        })
    })
})