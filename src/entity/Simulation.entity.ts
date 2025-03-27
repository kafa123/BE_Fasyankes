import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";
import { PersonalCase } from "./PersonalCase.entity";
  
  @Entity({ name: "simulations" })
  export class Simulation {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({
        type: "enum",
        enum: ["pasien_lama", "pasien_baru"],
        enumName: "simulations_patient_type_enum",
        nullable: false,
    })
    patient_type: string;

    @Column({
        type: "enum",
        enum: ["rawat_jalan", "rawat_inap", "gawat_darurat"],
        enumName: "simulations_category_enum",
        nullable: false,
    })
    category: string;

    @Column({ nullable: false })
    case: string;

    @Column({ nullable: false })
    payment_method: string;

    @Column({ nullable: false })
    case_description: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => PersonalCase, (personalCase) => personalCase.simulation)
    personalCases: PersonalCase[];
  }