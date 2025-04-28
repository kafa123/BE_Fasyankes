import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { payload } from "../dto/user.dto";

dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }

  static generateTokenPasswordToken(payload: payload, password: string){
    const secret = JWT_SECRET + password;
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  }

  static verifyTokenPasswordToken(token: string, password: string) {
    const secret = JWT_SECRET + password;
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}