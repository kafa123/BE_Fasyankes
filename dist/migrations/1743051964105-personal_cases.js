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
exports.PersonalCases1743051964105 = void 0;
const typeorm_1 = require("typeorm");
class PersonalCases1743051964105 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "personal_cases",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "simulation_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "checklist",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "duration",
                        type: "int",
                        default: 0,
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
            }));
            yield queryRunner.createForeignKey("personal_cases", new typeorm_1.TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            }));
            yield queryRunner.createForeignKey("personal_cases", new typeorm_1.TableForeignKey({
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
exports.PersonalCases1743051964105 = PersonalCases1743051964105;
//# sourceMappingURL=1743051964105-personal_cases.js.map