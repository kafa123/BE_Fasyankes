import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PrivacyRequests1743056913480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.createTable(
                    new Table({
                        name: "privacy_requests",
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
                                name: "privacy_request",
                                type: "text",
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
