import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";

import { Patient } from "./Patient.entity";

@Entity({ name: "patient_details" })
export class PatientDetail {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ nullable: false })
    patient_id: number;

    @Column({ nullable: false })
    type_of_insurance: string;

    @Column({
      type: "enum",
      enum: [
          "tidak sekolah",
          "SD",
          "SLTP sederajat",
          "SLTA sederajat",
          "D1-D3",
          "D4",
          "S1",
          "S2",
          "S3",
      ],
      enumName: "patient_details_educational_level_enum",
      nullable: false,
    })
    educational_level: string;

    @Column({
      type: "enum",
      enum: ["A", "B", "AB", "O"],
      enumName: "patient_details_blood_type_enum",
      nullable: true,
    })
    blood_type: string;

    @Column({
      type: "enum",
      enum: [
          "ISLAM",
          "KRISTEN",
          "KATHOLIK",
          "HINDU",
          "BUDHA",
          "KHONGHUCU",
          "PENGHAYAT",
          "LAIN-LAIN",
      ],
      enumName: "patient_details_religion_enum",
      nullable: true,
    })
    religion: string;

    @Column({
      type: "enum",
      enum: ["BELUM KAWIN", "KAWIN", "CERAI HIDUP", "CERAI MATI"],
      enumName: "patient_details_marriage_status_enum",
      nullable: false,
    })
    marriage_status: string;
    
    @Column({ nullable: true })
    profession: string;

    @Column({ nullable: true })
    ethnic: string;

    @Column({ nullable: true })
    language: string;

    @Column({ nullable: true })
    disability: string;

    @Column({ nullable: true })
    insurance_number: string;

    @OneToOne(() => Patient, (patient) => patient.patientDetail, { onDelete: "CASCADE" })
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

}