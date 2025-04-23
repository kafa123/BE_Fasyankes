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

@Entity({ name: "patient_referral_datas" })
export class PatientReferralData {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ nullable: false })
    patient_id: number;

    @Column({ nullable: false })
    referral_number: number;

    @Column({ nullable: false })
    referral_date: Date;

    @Column({ nullable: false })
    referrer: string;

    @Column({ nullable: false })
    PPK_code: string;

    @Column({ nullable: false })
    referrer_type: string;

    @Column({ nullable: false })
    admission_note: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Patient, (patient) => patient.patientReferralData, { onDelete: "CASCADE" })
    @JoinColumn({ name: "patient_id" })
    patient: Patient;

}