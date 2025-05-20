
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InpatientRecords1747284671873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "inpatients_records",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "patient_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "treatment_room",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "treatment_rate",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "treatment_class",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "isBooking",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: "isUpgradingClass",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: "doctor",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "entry_date",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "entry_type",
                        type: "varchar",
                        isNullable: false,
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
