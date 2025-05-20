import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Patient } from "./Patient.entity";

@Entity({ name: "patient_visit_datas" })
@Unique(["patient_id"])
export class PatientVisitData {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  patient_id: number;

  @Column({ type: "timestamp", nullable: false, default: () => "CURRENT_TIMESTAMP" })
  admission_time: Date;

  @Column({
    type: "enum",
    enum: [
      "Poliklinik Mata",
      "Poliklinik Jantung",
      "Poliklinik Dalam",
      "Poliklinik Saraf"
    ],
    enumName: "patient_visit_datas_clinic_enum",
    nullable: false,
  })
  clinic: string;

  @Column({ nullable: false })
  doctor: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Patient, (patient) => patient.patientVisitData, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patient_id" })
  patient: Patient;
}