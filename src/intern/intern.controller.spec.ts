/* eslint-disable prettier/prettier */
import { InternController } from "./intern.controller";
import { InternService } from "./intern.service";
import { InternEntity } from "./intern.entity";
import { Repository, Connection } from "typeorm";

describe("InternController", () => {
  let internController: InternController;
  let internService: InternService;
  let connection: Connection;
  let internRepository: Repository<InternEntity>
  beforeEach(() => {
    internService = new InternService(internRepository,connection);
    internController = new InternController(internService);
  });
  describe("getAllInterns", () => {
    it("Should return an array of interns", async () => {
      const interns: InternEntity[] = [
        { id: 1, name: "ad",mail:"sad",confirmed:false, school: "ad", field: "asd", department: "as", grade: 4, completed: 0, image: "", resume: "" ,startdate:"",enddate:""},
        { id: 2, name: "adas",mail:"sad",confirmed:false, school: "add", field: "asda", department: "asas", grade: 3, completed: 0, image: "", resume: "",startdate:"",enddate:""},
      ];

      jest.spyOn(internService, "findAll").mockResolvedValue(interns);

      const result = await internController.getAllInterns();
      expect(result).toEqual(interns);
    });
  });

  describe("getAllForDetail",()=>{
    it("Should return an array of id column", async()=>{
        const internIds : {id:number}[] = [{id:0},{id:1}];

        jest.spyOn(internService,'findAllForDetail').mockResolvedValue(internIds)
        
        const result = await internController.getAllForDetail();
        expect(result).toEqual(internIds)
    })
  })
  describe("getInternById",()=>{
    it("Should return an item of interns",async()=>{
        const intern : InternEntity = { id: 1, name: "ad",mail:"sad",confirmed:false, school: "ad", field: "asd", department: "as", grade: 4, completed: 0, image: "", resume: "",startdate:"",enddate:""}

        jest.spyOn(internService,'findOne').mockResolvedValue(intern)

        const result = await internController.getInternById("1")
        expect(result).toEqual(intern)

    })
  })

  describe("createIntern",()=>{
    it("Should create a new itern",async()=>{
        const intern : InternEntity = { id: 1, name: "ad",mail:"sad",confirmed:false, school: "ad", field: "asd", department: "as", grade: 4, completed: 0, image: "", resume: "",startdate:"",enddate:"" }

        jest.spyOn(internService,"create").mockResolvedValue(intern)

        const result = await internController.createIntern(intern)
        expect(result).toEqual(intern)
    })
  })

  describe("updateInternCompleted",()=>{
    it("Should update completed column of interns",async()=>{
        const completed : {value:number} = {value:0}
        
        jest.spyOn(internService,'updateCompleted').mockResolvedValue(completed)

        const result = await internController.updateInternCompleted("1",completed)
        expect(result).toEqual(completed)
    })
  })

  describe("updateIntern",()=>{
    it("Should update an item of interns",async()=>{
        const updated : InternEntity = { id: 1, name: "ad",mail:"sad",confirmed:false, school: "ad", field: "asd", department: "as", grade: 4, completed: 0, image: "", resume: "",startdate:"",enddate:"" }

        jest.spyOn(internService,"update").mockResolvedValue(updated)

        const result = await internController.updateIntern("1",updated)
        expect(result).toEqual(updated)
    })
  }),

  describe("deleteIntern",()=>{
    it("Should delete an item of interns",async()=>{
        const deleted : InternEntity = { id: 1, name: "ad",mail:"sad",confirmed:false, school: "ad", field: "asd", department: "as", grade: 4, completed: 0, image: "", resume: "",startdate:"",enddate:"" }

        jest.spyOn(internService,"remove").mockResolvedValue(deleted)

        const result = await internController.deleteIntern("1")
        expect(result).toEqual(deleted)
    })
  })
});
