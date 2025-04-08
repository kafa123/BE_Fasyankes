import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column, 
    ManyToOne, 
    JoinColumn
  } from "typeorm";

import { User } from "./User.entity";
import { Simulation } from "./Simulation.entity";
  
  @Entity({ name: "personal_cases" })
  export class PersonalCase {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (user) => user.personalCases, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Simulation, (simulation) => simulation.personalCases, { onDelete: "CASCADE" })
    @JoinColumn({ name: "simulation_id" })
    simulation: Simulation;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }