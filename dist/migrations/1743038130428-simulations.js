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
exports.Simulations1743006201765 = void 0;
const typeorm_1 = require("typeorm");
class Simulations1743006201765 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "simulations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "patient_type",
                        type: "enum",
                        enum: ["pasien_lama", "pasien_baru"],
                        isNullable: false,
                    },
                    {
                        name: "category",
                        type: "enum",
                        enum: ["rawat_jalan", "rawat_inap", "gawat_darurat"],
                        isNullable: false,
                    },
                    {
                        name: "diagnose",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "case_type",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "payment_method",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "case_description",
                        type: "text",
                        isNullable: false,
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
exports.Simulations1743006201765 = Simulations1743006201765;
//# sourceMappingURL=1743038130428-simulations.js.map