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
exports.Scenarios1743054574272 = void 0;
const typeorm_1 = require("typeorm");
class Scenarios1743054574272 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "scenarios",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "simulation_id", type: "int", isNullable: false },
                    { name: "scenario", type: "varchar", length: "600", isNullable: false },
                    { name: "question", type: "varchar", length: "400", isNullable: false },
                    { name: "component", type: "enum", enum: ["Pendaftaran", "Data Kunjungan", "Data Rujukan", "Data SEP"], isNullable: false },
                ],
            }));
            yield queryRunner.createForeignKey("scenarios", new typeorm_1.TableForeignKey({
                columnNames: ["simulation_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "simulations",
                onDelete: "CASCADE",
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Scenarios1743054574272 = Scenarios1743054574272;
//# sourceMappingURL=1743054574272-scenarios.js.map