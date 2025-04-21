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
exports.SepDatas1743057012435 = void 0;
const typeorm_1 = require("typeorm");
class SepDatas1743057012435 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "sep_datas",
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
                        name: "sep_number",
                        type: "varchar",
                        length: "40",
                        isNullable: false,
                    },
                    {
                        name: "reason_for_visit",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "procedure",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "assesment",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "note",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "accident",
                        type: "varchar",
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
exports.SepDatas1743057012435 = SepDatas1743057012435;
//# sourceMappingURL=1743057012435-sep_datas.js.map