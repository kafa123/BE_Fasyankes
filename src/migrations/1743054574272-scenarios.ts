import { MigrationInterface, QueryRunner, TableForeignKey, Table } from "typeorm";

export class Scenarios1743054574272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "scenarios",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "simulation_id", type: "int", isNullable: false },
                    { name: "order", type:"int", isNullable:false },
                    { name: "scenario", type: "varchar", length:"600", isNullable: false },
                    { name: "question", type: "varchar", length:"400", isNullable: false },
                    { name: "component", type: "enum", enum: ["pendaftaran" , "admission-rawat-jalan" , "admission-rawat-inap" , "admission-gawat-darurat"], isNullable: false },
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
        const table = await queryRunner.getTable("scenarios");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.includes("simulation_id"));

        if (foreignKey) {
            await queryRunner.dropForeignKey("scenarios", foreignKey);
        }

        await queryRunner.dropTable("scenarios");
    }

}
