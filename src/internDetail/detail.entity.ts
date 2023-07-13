/* eslint-disable prettier/prettier */
import { InternEntity } from 'src/intern/intern.entity';
import { PlanEntity } from 'src/plan/plan.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class DetailEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InternEntity , intern => intern.id)
  intern: number;

  @ManyToOne(() => PlanEntity, plan => plan.id)
  plan: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  done: boolean;
}