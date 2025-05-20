import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Simulation } from "./Simulation.entity";
import { ValueBelief } from "./ValueBelief.entity";
import { PrivacyRequest } from "./PrivacyRequest.entity";
import { HealthInformationPatient } from "./HealthInformationPatient.entity";
import { PatientDetail } from "./PatientDetail.entity";
import { PatientVisitData } from "./PatientVisitData.entity";
import { PatientReferralData } from "./PatientReferralData.entity";
import { SepData } from "./SepData.entity";
import { InpatientRecord } from "./InpatientRecord.entity";
import { ResponsiblePerson } from "./ResponsiblePerson.entity";

@Entity({ name: "patients" })
@Unique(["simulation_id"])
export class Patient {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  simulation_id: number;

  @Column({ nullable: false })
  nik: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: ["L", "P"],
    enumName: "patients_gender_enum",
    nullable: false,
  })
  gender: string;

  @Column({ nullable: false })
  date_of_birth: Date;

  @Column({ nullable: false })
  place_of_birth: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: false })
  province: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  district: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Simulation, (simulation) => simulation.patient, { onDelete: "CASCADE" })
  @JoinColumn({ name: "simulation_id" })
  simulation: Simulation;

  @OneToOne(() => ValueBelief, (valueBelief) => valueBelief.patient)
  valueBelief: ValueBelief;

  @OneToOne(() => PrivacyRequest, (privacyRequest) => privacyRequest.patient)
  privacyRequest: PrivacyRequest;

  @OneToOne(() => HealthInformationPatient, (healthInformationPatient) => healthInformationPatient.patient)
  healthInformationPatient: HealthInformationPatient;

  @OneToOne(() => PatientDetail, (patientDetail) => patientDetail.patient)
  patientDetail: PatientDetail;

  @OneToOne(() => PatientVisitData, (patientVisitData) => patientVisitData.patient)
  patientVisitData: PatientVisitData;

  @OneToOne(() => PatientReferralData, (patientReferralData) => patientReferralData.patient)
  patientReferralData: PatientReferralData;

  @OneToOne(() => SepData, (sepData) => sepData.patient)
  sepData: SepData;

  @OneToOne(() => InpatientRecord, (record) => record.patient)
  inpatientRecords: InpatientRecord[];

  @OneToOne(() => ResponsiblePerson, (rp) => rp.patient)
  responsiblePerson: ResponsiblePerson;

}