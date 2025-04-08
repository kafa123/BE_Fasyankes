import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PatientDetails1743056983994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
                new Table({
                    name: "patient_details",
                    columns: [
                        {
                            name: "id",
                            type: "serial",
                            isPrimary: true,
                        },
                        {
                            name: "patient_id",
                            type: "int",
                            isNullable: false,
                        },
                        {
                            name: "type_of_insurance",
                            type: "varchar",
                            length: "100",
                            isNullable: false,
                        },
                        {
                            name: "educational_level",
                            type: "enum",
                            enum: [
                                "tidak sekolah", "SD", "SLTP sederajat", "SLTA sederajat",
                                "D1-D3", "D4", "S1", "S2", "S3"
                            ],
                            isNullable: false,
                        },
                        {
                            name: "blood_type",
                            type: "enum",
                            enum: ["A", "B", "AB", "O"],
                            isNullable: true,
                        },
                        {
                            name: "religion",
                            type: "enum",
                            enum: [
                                "ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA",
                                "KHONGHUCU", "PENGHAYAT", "LAIN-LAIN"
                            ],
                            isNullable: true,
                        },
                        {
                            name: "marriage_status",
                            type: "enum",
                            enum: ["BELUM KAWIN", "KAWIN", "CERAI HIDUP", "CERAI MATI"],
                            isNullable: false,
                        },
                        {
                            name: "profession",
                            type: "varchar",
                            length: "100",
                            isNullable: true,
                        },
                        {
                            name: "ethnic",
                            type: "varchar",
                            length: "100",
                            isNullable: true,
                        },
                        {
                            name: "language",
                            type: "varchar",
                            length: "100",
                            isNullable: true,
                        },
                        {
                            name: "disability",
                            type: "varchar",
                            length: "255",
                            isNullable: true,
                        },
                        {
                            name: "insurance_number",
                            type: "varchar",
                            length: "255",
                            isNullable: true,
                        },
                    ],
                    foreignKeys: [
                        {
                            columnNames: ["patient_id"],
                            referencedColumnNames: ["id"],
                            referencedTableName: "patients",
                            onDelete: "CASCADE",
                        },
                    ],
                })
            );
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
