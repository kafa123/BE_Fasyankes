import { MigrationInterface, QueryRunner, TableForeignKey, Table } from "typeorm";

export class Scenarios1743054574272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "scenarios",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "simulation_id", type: "int", isNullable: false },
                    { name: "scenario", type: "varchar", length:"600", isNullable: false },
                    { name: "question", type: "varchar", length:"400", isNullable: false },
                    { name: "component", type: "enum", enum: ["Pendaftaran", "Data Kunjungan", "Data Rujukan", "Data SEP"], isNullable: false },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "scenarios",
            new TableForeignKey({
                columnNames: ["simulation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "simulations",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
