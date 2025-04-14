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
exports.HealthInformationPatients1743056938865 = void 0;
const typeorm_1 = require("typeorm");
class HealthInformationPatients1743056938865 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "health_information_patients",
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
                        name: "name",
                        type: "varchar",
                        length: "40",
                        isNullable: true,
                    },
                    {
                        name: "family_relationship",
                        type: "varchar",
                        length: "40",
                        isNullable: true,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "20",
                        isNullable: true,
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
exports.HealthInformationPatients1743056938865 = HealthInformationPatients1743056938865;
//# sourceMappingURL=1743056938865-health_information_patients.js.map