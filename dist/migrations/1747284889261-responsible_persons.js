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
exports.ResponsiblePersons1747284889261 = void 0;
const typeorm_1 = require("typeorm");
class ResponsiblePersons1747284889261 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "ResponsiblePerson",
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
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "gender",
                        type: "enum",
                        enum: ["L", "P"]
                    },
                    {
                        name: "date_of_birth",
                        type: "date",
                    },
                    {
                        name: "identity_number",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "number_telphone",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "address",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "relationship",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "has_no_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_hearing_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_emotion_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_visual_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "has_speech_impairment",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "isLiterate",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "needsInterpreter",
                        type: "boolean",
                        default: false
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
exports.ResponsiblePersons1747284889261 = ResponsiblePersons1747284889261;
//# sourceMappingURL=1747284889261-responsible_persons.js.map