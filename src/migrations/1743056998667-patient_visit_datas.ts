import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PatientVisitDatas1743056998667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "patient_visit_datas",
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
                        name: "admission_time",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "clinic",
                        type: "enum",
                        enum: ["Poliklinik Mata", "Poliklinik Jantung", "Poliklinik Dalam", "Poliklinik Saraf"],
                        isNullable: true,
                    },
                    {
                        name: "doctor",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
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
