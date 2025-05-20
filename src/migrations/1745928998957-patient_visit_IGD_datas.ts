import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm";

export class PatientVisitIGD1745928998957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.createTable(
                    new Table({
                        name: "patient_visit_IGD_datas",
                        columns: [
                            {
                                name: "id",
                                type: "serial",
                                isPrimary: true,
                            },
                            {
                                name: "simulation_id",
                                type: "int",
                                isNullable: false,
                            },
                            {
                                name: "admission_time",
                                type: "timestamp",
                                isNullable: false,
                            },
                            {
                                name: "doctor",
                                type: "varchar",
                                length: "50",
                                isNullable: false,
                            },
                            {
                                name:"procedure_case",
                                type:"enum",
                                enum:["Bedah","Non Bedah"],
                                isNullable:false
                            },
                            {
                                name:"is_accident",
                                type:"bool",
                                default:false
                            },
                            {
                                name:"entry_method",
                                type:"enum",
                                enum:["sendiri","diantar"],
                                isNullable:false
                            },
                            {
                                name: "insurance_number",
                                type: "varchar",
                                length: "255",
                                isNullable: true,
                            },
                            {
                                name: "createdAt",
                                type: "timestamp",
                                default: "now()",
                            },
                            {
                                name: "updatedAt",
                                type: "timestamp",
                                default: "now()",
                            },
                        ],
                        foreignKeys: [
                            {
                                columnNames: ["simulation_id"],
                                referencedColumnNames: ["id"],
                                referencedTableName: "simulations",
                                onDelete: "CASCADE",
                            },
                        ],
                    })
                );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
