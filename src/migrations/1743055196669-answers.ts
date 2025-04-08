import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Answers1743055196669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "answers",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "scenario_id", type: "int", isNullable: false },
                    { name: "answer_text", type: "varchar", length: "1000", isNullable: true },
                    { name: "answer_image", type: "varchar", length: "2083", isNullable: true }, 
                ],
            })
        );

        await queryRunner.createForeignKey(
            "answers",
            new TableForeignKey({
                columnNames: ["scenario_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "scenarios",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
