import {
  Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Scenario } from "./Scenario.entity";

@Entity({ name: "answers" })
export class Answer {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ nullable: false })
    scenario_id: number;

    @Column({ nullable: true })
    answer_text: string;

    @Column({ nullable: true })
    answer_image: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Scenario, (scenario) => scenario.answer, { onDelete: "CASCADE" })
    @JoinColumn({ name: "scenario_id" })
    scenario: Scenario;

}