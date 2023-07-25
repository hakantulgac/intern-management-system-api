/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { UserEntity } from "./user.entity"


describe('UserController',()=>{
    let userService : UserService
    let userController : UserController
    let userConnection : Connection
    let userRepository : Repository<UserEntity>

    beforeEach(()=>{
        userService = new UserService(userRepository,userConnection)
        userController = new UserController(userService)
    })

    describe("auth",()=>{
        it("Should be login",async()=>{
            const user :{id:number}|{message:string} = {id:3} || {message:"error"}  

            jest.spyOn(userService,"auth").mockResolvedValue(user)

            const result = await userController.auth({id:3,name:"sada",password:""})
            expect(result).toEqual(user)
        })
    })

    describe("getAllUsers",()=>{
        it("Should return an array of users",async()=>{
            const users : UserEntity[] = [
                {id:1,name:"dsad",password:"dfsdf"},
                {id:2,name:"asda",password:"adasd"}
            ]
            
            jest.spyOn(userService,"findAll").mockResolvedValue(users)

            const result = await userController.getAllUsers()
            expect(result).toEqual(users)
        })
    })

    describe("createUser",()=>{
        it("Should create an user",async()=>{
            const user: UserEntity = {id:1,name:"dsad",password:"dfsdf"}

            jest.spyOn(userService,"create").mockResolvedValue(user)

            const result = await userController.createUser(user)
            expect(result).toEqual(user)
        })
    })

    describe("findOne",()=>{
        it("Should return an item of users",async()=>{
            const user: UserEntity = {id:1,name:"dsad",password:"dfsdf"}

            jest.spyOn(userService,"findOne").mockResolvedValue(user)

            const result = await userController.findOne("2")
            expect(result).toEqual(user)
        })
    })

    describe("update",()=>{
        it("Should update an user",async()=>{
            const user : UserEntity = {id:1,name:"saada",password:"sadasd"}

            jest.spyOn(userService,"update").mockResolvedValue(user)

            const result = await userController.update("1",user)
            expect(result).toEqual(user)
        })
    })

    describe("remove",()=>{
        it("Should delete an user",async()=>{
            const user : UserEntity = {id:1,name:"saada",password:"sadasd"}

            jest.spyOn(userService,"remove").mockResolvedValue(user)

            const result = await userController.remove("1")
            expect(result).toEqual(user)
        })
    })
})