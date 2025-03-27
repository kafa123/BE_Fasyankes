import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Simulations1743006201765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "simulations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "patient_type",
                        type: "enum",
                        enum: ["pasien_lama", "pasien_baru"],
                        isNullable: false,
                    },
                    {
                        name: "category",
                        type: "enum",
                        enum: ["rawat_jalan", "rawat_inap", "gawat_darurat"],
                        isNullable: false,
                    },
                    {
                        name: "diagnose",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "case",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "payment_method",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "case_description",
                        type: "text",
                        isNullable: false,
                    },
                ],
            })
        );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
