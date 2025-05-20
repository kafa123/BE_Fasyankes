import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Simulation } from "./Simulation.entity";

export enum ProcedureCase {
  Bedah = "Bedah",
  NonBedah = "Non Bedah",
}

export enum EntryMethod {
  Sendiri = "sendiri",
  Diantar = "diantar",
}

@Entity("patient_visit_IGD_datas")
export class PatientVisitIGD {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  simulation_id: number;

  @Column({ type: "timestamp" })
  admission_time: Date;
  
  @Column({ type: "varchar", length: 50 })
  doctor: string;
  
  @Column({
    type: "enum",
    enum: ProcedureCase,
  })
  procedure_case: ProcedureCase;
  
  @Column({ type: "bool", default: false })
  is_accident: boolean;
  
  @Column({
    type: "enum",
    enum: EntryMethod,
  })
  entry_method: EntryMethod;

  @Column({ type: "varchar", length: 255, nullable: true })
  insurance_number?: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;
  
  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => Simulation, (simulation) => simulation.patientVisitIGD, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "simulation_id" })
  simulation: Simulation;
}
