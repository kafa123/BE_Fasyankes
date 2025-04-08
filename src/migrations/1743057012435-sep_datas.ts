import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SepDatas1743057012435 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sep_datas",
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
                        name: "sep_number",
                        type: "varchar",
                        length: "40",
                        isNullable: false,
                    },
                    {
                        name: "reason_for_visit",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "procedure",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "assesment",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "note",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "accident",
                        type: "varchar",
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
