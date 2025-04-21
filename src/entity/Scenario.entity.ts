import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Simulation } from "./Simulation.entity";
import { Answer } from "./Answer.entity";

@Entity({ name: "scenarios" })
export class Scenario {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ nullable: false })
    simulation_id: number;

    @Column({ nullable: false })
    scenario: string;

    @Column({ nullable: false })
    question: string;

    @Column({
      type: "enum",
      enum: ["Pendaftaran", "Data Kunjungan", "Data Rujukan", "Data SEP"],
      enumName: "scenarios_componen_enum",
      nullable: false,
    })
    component: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Simulation, (simulation) => simulation.scenario, { onDelete: "CASCADE" })
    @JoinColumn({ name: "simulation_id" })
    simulation: Simulation;

    @OneToOne(() => Answer, (answer) => answer.scenario)
    answer: Answer;
}