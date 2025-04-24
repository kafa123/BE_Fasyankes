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
exports.Users1741821588080 = void 0;
class Users1741821588080 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
          CREATE TABLE "users" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(50) NOT NULL,
            "email" varchar(50) NOT NULL,
            "password" varchar(200) NOT NULL,
            "profesion" varchar(50) NULL,
            "institute" varchar(50) NULL,
            "phone_number" varchar(50) NULL,
            "role" varchar(20) NOT NULL DEFAULT 'user',
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
          )
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.Users1741821588080 = Users1741821588080;
//# sourceMappingURL=1741821588080-users.js.map