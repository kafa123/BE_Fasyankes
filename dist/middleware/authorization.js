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
exports.authorization = void 0;
const data_source_1 = require("../data-source");
const User_entity_1 = require("../entity/User.entity");
const authorization = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userRepo = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            const user = yield userRepo.findOne({
                where: { id: req["currentUser"].id },
            });
            if (!user || !roles.includes(user.role)) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }
            next();
        }
        catch (error) {
            next(error); //
        }
    });
};
exports.authorization = authorization;
//# sourceMappingURL=authorization.js.map