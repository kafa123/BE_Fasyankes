import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from "typeorm";
  
  @Entity({ name: "user_counts" })
  export class UserCount {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column({ nullable: false })
    user_id: number;
  
    @Column({ type:"date", nullable: false })
    login_date: Date;
  }