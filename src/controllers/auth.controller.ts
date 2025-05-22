import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { UserCount } from "../entity/UserCount.entity";
import * as jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

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

      if (!user) {
        res
          .status(404)
          .json({ message: "Invalid Email" });
        return;
      }

      const isPasswordValid = encrypt.comparepassword(user.password, password);

      if (!user || !isPasswordValid) {
        res
          .status(404)
          .json({ message: "Password Salah" });
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

    if (!name || !email || !password || !role || !phone_number) {
      res.status(400).json({
        message: "Name, email, password, phone, and role are required",
      });
      return;
    }

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

  static async getProfile(req: Request, res: Response) {
    try {
        
        const userId = req["currentUser"]?.id;

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        const repo = AppDataSource.getRepository(User);

        const detailProfile = await repo.findOne({ where: { id: userId } });

      res.status(200).json({ data: detailProfile });
      return;
      
    } catch (error) {
      console.error("Error fetching personal cases:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {

      const userId = req["currentUser"]?.id;
  
      if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
      }
  
      const repo = AppDataSource.getRepository(User);
      let user = await repo.findOneBy({ id: userId });
  
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
  
      repo.merge(user, req.body); 

      await repo.save(user);
  
      res.status(200).json({ message: "User updated successfully", user });
      return;
  
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  static async postNewPassword(req: Request, res: Response) {
    try {

      const userId = req["currentUser"]?.id;
  
      if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
      }

      const { old_password, new_password } = req.body;

      if ( !old_password || !new_password) {
        res.status(400).json({ error: "Masukkan password lama dan baru" });
        return;
      }

      const repo = AppDataSource.getRepository(User)
      let user = await repo.findOneBy({ id: userId });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const isMatch = encrypt.comparepassword(user.password, old_password);

      if (!isMatch) {
        res.status(401).json({ error: "Old password is incorrect" });
        return;
      }

      user.password = await encrypt.encryptpass(new_password);
      await repo.save(user);
    
      res.status(200).json({ message: "Password updated successfully" });
      return;

    } catch (error) {
      console.error("Error Post Old Password:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  static async requestPasswordReset(req: Request, res: Response) {
    try {

      const repo = AppDataSource.getRepository(User);

      const { email } = req.body;

      const user = await repo.findOne({ where: { email: email } });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const token = encrypt.generateTokenPasswordToken({ id: user.id}, user.password);

      const resetURL = `http://localhost:19200/auth/resetpassword/${user.id}/${token}`;

      const nodemailer = require('nodemailer');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Password reset link sent' });

    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  static async resetPassword(req: Request, res: Response) {
    const { id, token } = req.params;
    const { password } = req.body;

    console.log("masuk sini kok");
    console.log("id", id)

    const parsedId = Number(id);

    if (isNaN(parsedId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }

    try {
      const repo = AppDataSource.getRepository(User);
      let user = await repo.findOneBy({ id: parsedId });
  
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      try {
        encrypt.verifyTokenPasswordToken(token, user.password); // Verifikasi token
      } catch (error) {
        console.error('Token verification failed:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
        return;
      }

      user.password = await encrypt.encryptpass(password);

      await repo.save(user);

      res.status(200).json({ message: "Password successfully updated" });
      return;
    } catch (error) {
      console.error("Error Post Reset Password:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

}