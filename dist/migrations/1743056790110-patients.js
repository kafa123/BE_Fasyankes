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
exports.Patients1743056790110 = void 0;
const typeorm_1 = require("typeorm");
class Patients1743056790110 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "patients",
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
                        name: "nik",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "gender",
                        type: "enum",
                        enum: ["L", "P"],
                        isNullable: false,
                    },
                    {
                        name: "date_of_birth",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "place_of_birth",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "15",
                        isNullable: true,
                    },
                    {
                        name: "address",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "province",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "city",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "district",
                        type: "varchar",
                        length: "100",
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
exports.Patients1743056790110 = Patients1743056790110;
//# sourceMappingURL=1743056790110-patients.js.map