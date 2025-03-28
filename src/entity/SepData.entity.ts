import {
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

@Entity({ name: "sep_datas" })
export class SepData {
    @PrimaryGeneratedColumn("increment")
    id: number;

}