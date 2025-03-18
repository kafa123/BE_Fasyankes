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
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const User_entity_1 = require("../entity/User.entity");
const encrypt_1 = require("../helpers/encrypt");
const cache = require("memory-cache");
class UserController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, profesion, institute, phone_number, role } = req.body;
            const encryptedPassword = yield encrypt_1.encrypt.encryptpass(password);
            const user = new User_entity_1.User();
            user.name = name;
            user.email = email;
            user.password = encryptedPassword;
            user.profesion = profesion;
            user.institute = institute;
            user.phone_number = phone_number;
            user.role = role;
            const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
            yield userRepository.save(user);
            res
                .status(200)
                .json({ message: "User created successfully", user });
            return;
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
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map