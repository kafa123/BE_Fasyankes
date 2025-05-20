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
exports.PatientVisitIGD1745928998957 = void 0;
const typeorm_1 = require("typeorm");
class PatientVisitIGD1745928998957 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "patient_visit_IGD_datas",
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
                        name: "admission_time",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "doctor",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "procedure_case",
                        type: "enum",
                        enum: ["Bedah", "Non Bedah"],
                        isNullable: false
                    },
                    {
                        name: "is_accident",
                        type: "bool",
                        default: false
                    },
                    {
                        name: "entry_method",
                        type: "enum",
                        enum: ["sendiri", "diantar"],
                        isNullable: false
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
exports.PatientVisitIGD1745928998957 = PatientVisitIGD1745928998957;
//# sourceMappingURL=1745928998957-patient_visit_IGD_datas.js.map