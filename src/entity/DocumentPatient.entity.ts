import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
  } from "typeorm";
  import { Simulation } from "./Simulation.entity";
  
  @Entity("document_patients")
  export class DocumentPatient {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    simulation_id: number;
  
    @Column({ type: "bool", default: false })
    has_patient_card: boolean;
  
    @Column({ type: "bool", default: false })
    has_polyclinic_form: boolean;
  
    @Column({ type: "bool", default: false })
    has_small_label: boolean;
  
    @Column({ type: "bool", default: false })
    has_big_label: boolean;
    
    @Column({ type: "bool", default: false })
    has_tracer_RM_document: boolean;
    
    @Column({ type: "bool", default: false })
    has_proof_of_service: boolean;
    
    @Column({ type: "bool", default: false })
    has_SEP: boolean;
    
    @Column({ type: "bool", default: false })
    has_queue_number: boolean;
    
    @Column({ type: "bool", default: false })
    has_patient__bracelet: boolean;
    
    @Column({ type: "bool", default: false })
    has_general_consent: boolean;
    
    @Column({ type: "bool", default: false })
    has_control_card: boolean;
    
    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;
    
    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @OneToOne(() => Simulation, (simulation) => simulation.documentPatient, {
      onDelete: "CASCADE",
    })
    @JoinColumn({ name: "simulation_id" })
    simulation: Simulation;
}
