import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { Patient } from "./Patient.entity";

@Entity("inpatients_records")
export class InpatientRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @Column({ type: "varchar", length: 100 })
  treatment_room: string;

  @Column()
  treatment_rate: number;

  @Column({ type: "varchar", length: 100 })
  treatment_class: string;

  @Column({ type: "boolean", default: false })
  isBooking: boolean;

  @Column({ type: "boolean", default: false })
  isUpgradingClass: boolean;

  @Column({ type: "varchar", length: 255 })
  doctor: string;

  @Column({ type: "date" })
  entry_date: string;

  @Column()
  entry_type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Patient, (patient) => patient.inpatientRecords, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patient_id" })
  patient: Patient;
}
