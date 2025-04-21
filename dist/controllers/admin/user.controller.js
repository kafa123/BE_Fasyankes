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
exports.AdminUserController = void 0;
const data_source_1 = require("../../data-source");
const cache = require("memory-cache");
const UserCount_entity_1 = require("../../entity/UserCount.entity");
const User_entity_1 = require("../../entity/User.entity");
class AdminUserController {
    static getUserCounts(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = cache.get("data");
            if (data) {
                console.log("serving from cache");
                res.status(200).json({
                    data,
                });
                return;
            }
            else {
                console.log("serving from db");
                const userCountRepository = data_source_1.AppDataSource.getRepository(UserCount_entity_1.UserCount);
                const loginCounts = yield userCountRepository
                    .createQueryBuilder("user_count")
                    .select("TO_CHAR(user_count.login_date, 'YYYY-MM-DD')", "date")
                    .addSelect("COUNT(user_count.id)", "total_login_users")
                    .where("user_count.login_date >= CURRENT_DATE - INTERVAL '10 days'")
                    .groupBy("user_count.login_date")
                    .orderBy("date", "ASC")
                    .getRawMany();
                cache.put("data", loginCounts, 6000);
                res.status(200).json({
                    data: loginCounts,
                });
                return;
            }
        });
    }
    static getUsers(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = cache.get("data");
            if (data) {
                console.log("serving from cache");
                res.status(200).json({
                    data,
                });
                return;
            }
            else {
                console.log("serving from db");
                const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                const users = yield userRepository.find();
                cache.put("data", users, 6000);
                res.status(200).json({
                    data: users,
                });
                return;
            }
        });
    }
}
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=user.controller.js.map