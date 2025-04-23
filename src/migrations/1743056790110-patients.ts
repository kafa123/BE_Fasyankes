import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Patients1743056790110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "patients",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "simulation_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "nik",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "gender",
                        type: "enum",
                        enum: ["L", "P"],
                        isNullable: false,
                    },
                    {
                        name: "date_of_birth",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "place_of_birth",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "15",
                        isNullable: true,
                    },
                    {
                        name: "address",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "province",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "city",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "district",
                        type: "varchar",
                        length: "100",
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
                        columnNames: ["simulation_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "simulations",
                        onDelete: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
