import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserScenarios1747713273300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.createTable(
                    new Table({
                        name: "user_scenarios",
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
                                name: "scenario_id",
                                type: "int",
                                isNullable: false,
                            },
                            {
                                name: "score_similarity",
                                type: 'decimal',
                                precision: 5,
                                scale: 2,
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
                                columnNames: ["user_id"],
                                referencedColumnNames: ["id"],
                                referencedTableName: "users",
                                onDelete: "CASCADE",
                            },
                            {
                                columnNames: ["scenario_id"],
                                referencedColumnNames: ["id"],
                                referencedTableName: "scenarios",
                                onDelete: "CASCADE",
                            },
                        ],
                    })
                );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
