import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Patient } from "./Patient.entity";

@Entity("ResponsiblePerson")
export class ResponsiblePerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patient_id: number;

  @OneToOne(() => Patient, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "enum", enum: ["L", "P"] })
  gender: "L" | "P";

  @Column({ type: "date" })
  date_of_birth: string;

  @Column({ type: "varchar", length: 100 })
  identity_number: string;

  @Column({ type: "varchar", length: 20 })
  number_telphone: string;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "varchar", length: 100 })
  relationship: string;

  @Column({ type: "boolean", default: false })
  has_no_impairment: boolean;

  @Column({ type: "boolean", default: false })
  has_hearing_impairment: boolean;

  @Column({ type: "boolean", default: false })
  has_emotion_impairment: boolean;

  @Column({ type: "boolean", default: false })
  has_visual_impairment: boolean;

  @Column({ type: "boolean", default: false })
  has_speech_impairment: boolean;

  @Column({ type: "boolean", default: false })
  isLiterate: boolean;

  @Column({ type: "boolean", default: false })
  needsInterpreter: boolean;
}
