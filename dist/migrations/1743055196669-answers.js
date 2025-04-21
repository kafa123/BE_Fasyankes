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
exports.Answers1743055196669 = void 0;
const typeorm_1 = require("typeorm");
class Answers1743055196669 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "answers",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "scenario_id", type: "int", isNullable: false },
                    { name: "answer_text", type: "varchar", length: "1000", isNullable: true },
                    { name: "answer_image", type: "varchar", length: "2083", isNullable: true },
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
            }));
            yield queryRunner.createForeignKey("answers", new typeorm_1.TableForeignKey({
                columnNames: ["scenario_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "scenarios",
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Answers1743055196669 = Answers1743055196669;
//# sourceMappingURL=1743055196669-answers.js.map