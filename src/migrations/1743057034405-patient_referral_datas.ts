import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PatientReferralDatas1743057034405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "patient_referral_datas",
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
                        name: "referral_number",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "referral_date",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "referrer",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "PPK_code",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "referrer_type",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "admission_note",
                        type: "varchar",
                        length: "255",
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
