/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm"
import { DocsController } from "./docs.controller"
import { DocsService } from "./docs.service"
import { DocsEntity } from "./docs.entity"


describe('UserController',()=>{
    let docsService : DocsService
    let docsController : DocsController
    let docsConnection : Connection
    let docsRepository : Repository<DocsEntity>

    beforeEach(()=>{
        docsService = new DocsService(docsRepository,docsConnection)
        docsController = new DocsController(docsService)
    })

    describe("createDocs",()=>{
        it("Should create a docs",async()=>{
            const docs: DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"create").mockResolvedValue(docs)

            const result = await docsController.createUser(docs)
            expect(result).toEqual(docs)
        })
    })

    describe("findOne",()=>{
        it("Should return an item of aocss",async()=>{
            const docs: DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"findOne").mockResolvedValue(docs)

            const result = await docsController.findOne("2")
            expect(result).toEqual(docs)
        })
    })

    describe("update",()=>{
        it("Should update an user",async()=>{
            const docs : DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"update").mockResolvedValue(docs)

            const result = await docsController.update("1",docs)
            expect(result).toEqual(docs)
        })
    })

    describe("remove",()=>{
        it("Should delete an user",async()=>{
            const docs : DocsEntity = {id:1,internid:1,accForm:"",criRecord:"",educDoc:"",idRegister:""}

            jest.spyOn(docsService,"remove").mockResolvedValue(docs)

            const result = await docsController.remove("1")
            expect(result).toEqual(docs)
        })
    })
})