import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ResponsiblePersons1747284889261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ResponsiblePerson",
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
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "gender",
                        type: "enum",
                        enum: ["L","P"]
                    },
                    {
                        name: "date_of_birth",
                        type: "date",
                    },
                    {
                        name: "identity_number",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "number_telphone",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "address",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "relationship",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "has_no_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_hearing_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_emotion_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_visual_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_speech_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "isLiterate",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "needsInterpreter",
                        type: "boolean",
                        default: false
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
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
