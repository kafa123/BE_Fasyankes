import {
  Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Patient } from "./Patient.entity";

@Entity({ name: "value_beliefs" })
export class ValueBelief {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ nullable: false })
    patient_id: number;

    @Column({ nullable: true })
    value_belief: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Patient, (patient) => patient.valueBelief, { onDelete: "CASCADE" })
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

}