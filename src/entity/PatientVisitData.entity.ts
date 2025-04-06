import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  } from "typeorm";
import { Patient } from "./Patient.entity";

@Entity({ name: "patient_visit_datas" })
export class PatientVisitData {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ nullable: false })
    patient_id: number;

    @Column({ nullable: false })
    admision_time: Date;

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

    @OneToOne(() => Patient, (patient) => patient.patientVisitData, { onDelete: "CASCADE" })
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

}