import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { User } from "./User.entity";
import { Scenario } from "./Scenario.entity";

  @Entity({ name: "user_scenarios" })
    export class UserScenario {
        @PrimaryGeneratedColumn("increment")
        id: number;
        
        @Column({ nullable: false })
        user_id: number;
        
        @Column({ nullable: false })
        scenario_id: number;

        @Column({ nullable: false })
        score_similarity: number;
        
        @CreateDateColumn()
        createdAt: Date;
        
        @UpdateDateColumn()
        updatedAt: Date;
  
        @ManyToOne(() => User, (user) => user.userScenario, { onDelete: "CASCADE" })
        @JoinColumn({ name: "user_id" })
        user: User;

        @ManyToOne(() => Scenario, (scenario) => scenario.userScenario, { onDelete: "CASCADE" })
        @JoinColumn({ name: "scenario_id" })
        scenario: Scenario;

    }