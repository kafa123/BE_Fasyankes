import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRepo = AppDataSource.getRepository(User);
      
      const user = await userRepo.findOne({
        where: { id: req["currentUser"].id },
      });

      if (!user || !roles.includes(user.role)) {
        res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      next(error); //
    }
  };
};