/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { DetailController } from "./detail.controller";
import { DetailService } from "./detail.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailEntity } from "./detail.entity";
import { InternEntity } from "src/intern/intern.entity";
import { PlanEntity } from "src/plan/plan.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DetailEntity,InternEntity,PlanEntity])],
    controllers : [DetailController],
    providers : [DetailService]
})

export class DetailModule{}