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
exports.encrypt = void 0;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET = "" } = process.env;
class encrypt {
    static encryptpass(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hashSync(password, 12);
        });
    }
    static comparepassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    }
    static generateToken(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    }
    static generateTokenPasswordToken(payload, password) {
        const secret = JWT_SECRET + password;
        return jwt.sign(payload, secret, { expiresIn: "1h" });
    }
    static verifyTokenPasswordToken(token, password) {
        const secret = JWT_SECRET + password;
        try {
            return jwt.verify(token, secret);
        }
        catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
exports.encrypt = encrypt;
//# sourceMappingURL=encrypt.js.map