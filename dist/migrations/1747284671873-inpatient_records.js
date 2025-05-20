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
exports.InpatientRecords1747284671873 = void 0;
const typeorm_1 = require("typeorm");
class InpatientRecords1747284671873 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "inpatients_records",
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
                        name: "treatment_room",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "treatment_rate",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "treatment_class",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "isBooking",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: "isUpgradingClass",
                        type: "boolean",
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: "doctor",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "entry_date",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "entry_type",
                        type: "varchar",
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
exports.InpatientRecords1747284671873 = InpatientRecords1747284671873;
//# sourceMappingURL=1747284671873-inpatient_records.js.map