import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Patient } from "./Patient.entity";

@Entity({ name: "privacy_requests" })
export class PrivacyRequest {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  patient_id: number;

  @Column({ nullable: true })
  privacy_request: string;

  @OneToOne(() => Patient, (patient) => patient.valueBelief, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

}