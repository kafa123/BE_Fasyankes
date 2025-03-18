import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import * as cache from "memory-cache";

export class UserController {
  
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
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    const token = encrypt.generateToken({ id: user.id });

    res
      .status(200)
      .json({ message: "User created successfully", token, user });
    return;
  }

  static async getUsers(_: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      res.status(200).json({
        data,
      });
      return;
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      res.status(200).json({
        data: users,
      });
      return;
    }
  }
  
}