import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne, 
    JoinColumn
  } from "typeorm";
import { Patient } from "./Patient.entity";

@Entity({ name: "sep_datas" })
export class SepData {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "int" })
    patient_id: number;
  
    @Column({ nullable: false })
    sep_number: string;
  
    @Column({ nullable: false })
    reason_for_visit: string;
  
    @Column({ nullable: false })
    procedure: string;
  
    @Column({ nullable: false })
    assesment: string;
  
    @Column({ nullable: false })
    note: string;
  
    @Column({ nullable: false })
    accident: string;

    @OneToOne(() => Patient, (patient) => patient.sepData, { onDelete: "CASCADE" })
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

}