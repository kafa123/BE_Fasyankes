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
exports.AuthController = void 0;
const data_source_1 = require("../data-source");
const User_entity_1 = require("../entity/User.entity");
const encrypt_1 = require("../helpers/encrypt");
const UserCount_entity_1 = require("../entity/UserCount.entity");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res
                        .status(500)
                        .json({ message: "email and password required" });
                    return;
                }
                const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                const user = yield userRepository.findOne({ where: { email } });
                const isPasswordValid = encrypt_1.encrypt.comparepassword(user.password, password);
                if (!user || !isPasswordValid) {
                    res
                        .status(404)
                        .json({ message: "User not found" });
                    return;
                }
                const token = encrypt_1.encrypt.generateToken({ id: user.id });
                const userCountRepository = data_source_1.AppDataSource.getRepository(UserCount_entity_1.UserCount);
                const newUserCount = userCountRepository.create({
                    user_id: user.id,
                    login_date: new Date(),
                });
                yield userCountRepository.save(newUserCount);
                res.status(200).json({ message: "Login successful", user, token });
                return;
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
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
    static getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req["currentUser"]) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(400).json({ error: "User ID is required" });
                    return;
                }
                const repo = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                const detailProfile = yield repo.findOne({ where: { id: userId } });
                res.status(200).json({ data: detailProfile });
                return;
            }
            catch (error) {
                console.error("Error fetching personal cases:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
        });
    }
    static updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req["currentUser"]) === null || _a === void 0 ? void 0 : _a.id;
                if (isNaN(userId)) {
                    res.status(400).json({ error: "Invalid user ID" });
                    return;
                }
                const repo = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                let user = yield repo.findOneBy({ id: userId });
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                repo.merge(user, req.body);
                yield repo.save(user);
                res.status(200).json({ message: "User updated successfully", user });
                return;
            }
            catch (error) {
                console.error("Error updating user profile:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
        });
    }
    static postNewPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req["currentUser"]) === null || _a === void 0 ? void 0 : _a.id;
                if (isNaN(userId)) {
                    res.status(400).json({ error: "Invalid user ID" });
                    return;
                }
                const { old_password, new_password } = req.body;
                if (!old_password || !new_password) {
                    res.status(400).json({ error: "Masukkan password lama dan baru" });
                    return;
                }
                const repo = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                let user = yield repo.findOneBy({ id: userId });
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                const isMatch = encrypt_1.encrypt.comparepassword(user.password, old_password);
                if (!isMatch) {
                    res.status(401).json({ error: "Old password is incorrect" });
                    return;
                }
                user.password = yield encrypt_1.encrypt.encryptpass(new_password);
                yield repo.save(user);
                res.status(200).json({ message: "Password updated successfully" });
                return;
            }
            catch (error) {
                console.error("Error Post Old Password:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map