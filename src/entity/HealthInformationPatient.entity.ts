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

@Entity({ name: "health_information_patients" })
export class HealthInformationPatient {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  patient_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  family_relationship: string;

  @Column({ nullable: true })
  phone_number: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Patient, (patient) => patient.healthInformationPatient, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

}