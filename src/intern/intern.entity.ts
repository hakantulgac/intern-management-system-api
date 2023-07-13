/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InternEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  grade: number;

  @Column()
  school: string;

  @Column()
  department: string;

  @Column()
  field: string;

  @Column()
  completed: number;
}