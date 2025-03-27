import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";
import { PersonalCase } from "./PersonalCase.entity";
  
  @Entity({ name: "users" })
  export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ nullable: false })
    name: string;
  
    @Column({ nullable: false })
    email: string;
  
    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    profesion: string;

    @Column({ nullable: true })
    institute: string;

    @Column({ nullable: false })
    phone_number: string;
  
    @Column({ default: "user" })
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => PersonalCase, (personalCase) => personalCase.user)
    personalCases: PersonalCase[];
  }