import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { UserCount } from "../entity/UserCount.entity";

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

      const userCountRepository = AppDataSource.getRepository(UserCount);

      const newUserCount = userCountRepository.create({
        user_id: user.id,
        login_date: new Date(),
      });

      await userCountRepository.save(newUserCount);

      res.status(200).json({ message: "Login successful", user, token });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  static async signup(req: Request, res: Response) {
    const { name, email, password, profesion, institute, phone_number, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.profesion = profesion;
    user.institute = institute;
    user.phone_number = phone_number;
    user.role = role ?? 'user';

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "User created successfully", user });
    return;
  }

}