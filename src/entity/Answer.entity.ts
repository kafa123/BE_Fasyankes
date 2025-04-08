import {
  Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,

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

    @OneToOne(() => Scenario, (scenario) => scenario.answer, { onDelete: "CASCADE" })
    @JoinColumn({ name: "scenario_id" })
    scenario: Scenario;

}