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
exports.PatientReferralDatas1743057034405 = void 0;
const typeorm_1 = require("typeorm");
class PatientReferralDatas1743057034405 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.PatientReferralDatas1743057034405 = PatientReferralDatas1743057034405;
//# sourceMappingURL=1743057034405-patient_referral_datas.js.map