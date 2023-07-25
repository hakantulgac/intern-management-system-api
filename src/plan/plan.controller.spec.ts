/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm";
import { PlanController } from "./plan.controller";
import { PlanService } from "./plan.service";
import { PlanEntity } from "./plan.entity";

describe("PlanController",()=>{
    let planController: PlanController
    let planService : PlanService
    let planRepository : Repository<PlanEntity>
    let planConnection : Connection

    beforeEach(()=>{
        planService = new PlanService(planRepository,planConnection)
        planController = new PlanController(planService)
    })

    describe("getAll",()=>{
        it("Should return an array of plans",async()=>{
            const plans: PlanEntity[] = [
                {id:1,days:3,description:"asd",title:"ksa"},
                {id:1,days:3,description:"asd",title:"ksa"}
            ]

            jest.spyOn(planService,"findAll").mockResolvedValue(plans)

            const result = await planController.getAll()
            expect(result).toEqual(plans)
        })
    })

    describe("getAllForIntern",()=>{
        it("Should return an array of id column", async()=>{
            const plans : {id:number}[] = [{id:0},{id:1}];
    
            jest.spyOn(planService,'findAllForIntern').mockResolvedValue(plans)
            
            const result = await planController.getAllForIntern();
            expect(result).toEqual(plans)
        })
    })

    describe("create",()=>{
        it("Should create a new plan",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa"}

            jest.spyOn(planService,"create").mockResolvedValue(plan)

            const result = await planController.create(plan)
            expect(result).toEqual(plan)
        })
    })

    describe('findOne',()=>{
        it("Should return an item of plans",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa"}
            
            jest.spyOn(planService,"findOne").mockResolvedValue(plan)

            const result = await planController.findOne("1")
            expect(result).toEqual(plan)
        })
    })

    describe("Should update an item of interns",()=>{
        it("update",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa"}

            jest.spyOn(planService,"update").mockResolvedValue(plan)

            const result = await planController.update("1",plan)
            expect(result).toEqual(plan)
        })
    })

    describe("Should delete an item of interns",()=>{
        it("remove",async()=>{
            const plan: PlanEntity = {id:1,days:3,description:"asd",title:"ksa"}

            jest.spyOn(planService,"remove").mockResolvedValue(plan)

            const result = await planController.remove("1")
            expect(result).toEqual(plan)
        })
    })
})