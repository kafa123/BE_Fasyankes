"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentPatients1745930314886 = void 0;
const typeorm_1 = require("typeorm");
class DocumentPatients1745930314886 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.DocumentPatients1745930314886 = DocumentPatients1745930314886;
//# sourceMappingURL=1745930314886-document_patients.js.map