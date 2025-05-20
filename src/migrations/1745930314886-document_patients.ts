import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DocumentPatients1745930314886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "document_patients",
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
                        name: "has_patient_card",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_polyclinic_form",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_small_label",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_big_label",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_tracer_RM_document",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_proof_of_service",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_SEP",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_queue_number",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_patient__bracelet",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_general_consent",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "has_control_card",
                        type: "bool",
                        default: false
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
