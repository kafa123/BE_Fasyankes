import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";

export class AuthController {

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res
          .status(500)
          .json({ message: "email and password required" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      const isPasswordValid = encrypt.comparepassword(user.password, password);

      if (!user || !isPasswordValid) {
        res
          .status(404)
          .json({ message: "User not found" });
        return;
      }

      const token = encrypt.generateToken({ id: user.id });

      res.status(200).json({ message: "Login successful", user, token });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

}