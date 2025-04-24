import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PersonalCases1743051964105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "personal_cases",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "simulation_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "checklist",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "duration",
                        type: "int",
                        default: 0,
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
            })
        );

        await queryRunner.createForeignKey(
            "personal_cases",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "personal_cases",
            new TableForeignKey({
                columnNames: ["simulation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "simulations",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("personal_cases");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.includes("simulation_id"));

        // Drop foreign key first
        if (foreignKey) {
            await queryRunner.dropForeignKey("personal_cases", foreignKey);
        }

        // Then drop the table
        await queryRunner.dropTable("personal_cases");
    }

}
