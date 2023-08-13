/* eslint-disable prettier/prettier */

import { Connection, Repository } from "typeorm"
import { AttendanceController } from "./attendance.controller"
import { AttendanceService } from "./attendance.service"
import { AttendanceEntity } from "./attendance.entity"


describe('UserController',()=>{
    let attendanceService : AttendanceService
    let attendanceController : AttendanceController
    let attendanceConnection : Connection
    let attendanceRepository : Repository<AttendanceEntity>

    beforeEach(()=>{
        attendanceService = new AttendanceService(attendanceRepository,attendanceConnection)
        attendanceController = new AttendanceController(attendanceService)
    })

    describe("createAttendance",()=>{
        it("Should create a attendance",async()=>{
            const attendance: AttendanceEntity = {id:1,internid:1,date:"17",value:true}

            jest.spyOn(attendanceService,"create").mockResolvedValue(attendance)

            const result = await attendanceController.createUser(attendance)
            expect(result).toEqual(attendance)
        })
    })

    describe("findOne",()=>{
        it("Should return an item of attendances",async()=>{
            const attendance: AttendanceEntity = {id:1,internid:1,date:"17",value:true}

            jest.spyOn(attendanceService,"findOne").mockResolvedValue(attendance)

            const result = await attendanceController.findOne("2")
            expect(result).toEqual(attendance)
        })
    })

    describe("update",()=>{
        it("Should update an user",async()=>{
            const attendance : AttendanceEntity = {id:1,internid:1,date:"17",value:true}

            jest.spyOn(attendanceService,"update").mockResolvedValue(attendance)

            const result = await attendanceController.update("1",attendance)
            expect(result).toEqual(attendance)
        })
    })

    describe("remove",()=>{
        it("Should delete an user",async()=>{
            const attendance : AttendanceEntity = {id:1,internid:1,date:"17",value:true}

            jest.spyOn(attendanceService,"remove").mockResolvedValue(attendance)

            const result = await attendanceController.remove("1","ssad")
            expect(result).toEqual(attendance)
        })
    })
})