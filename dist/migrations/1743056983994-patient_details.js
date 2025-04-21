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
exports.PatientDetails1743056983994 = void 0;
const typeorm_1 = require("typeorm");
class PatientDetails1743056983994 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "patient_details",
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
                        name: "type_of_insurance",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "educational_level",
                        type: "enum",
                        enum: [
                            "tidak sekolah", "SD", "SLTP sederajat", "SLTA sederajat",
                            "D1-D3", "D4", "S1", "S2", "S3"
                        ],
                        isNullable: false,
                    },
                    {
                        name: "blood_type",
                        type: "enum",
                        enum: ["A", "B", "AB", "O"],
                        isNullable: true,
                    },
                    {
                        name: "religion",
                        type: "enum",
                        enum: [
                            "ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA",
                            "KHONGHUCU", "PENGHAYAT", "LAIN-LAIN"
                        ],
                        isNullable: true,
                    },
                    {
                        name: "marriage_status",
                        type: "enum",
                        enum: ["BELUM KAWIN", "KAWIN", "CERAI HIDUP", "CERAI MATI"],
                        isNullable: false,
                    },
                    {
                        name: "profession",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "ethnic",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "language",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "disability",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "insurance_number",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
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
                        columnNames: ["patient_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "patients",
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
exports.PatientDetails1743056983994 = PatientDetails1743056983994;
//# sourceMappingURL=1743056983994-patient_details.js.map