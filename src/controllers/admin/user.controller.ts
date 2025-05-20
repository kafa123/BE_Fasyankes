import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import * as cache from "memory-cache";
import { UserCount } from "../../entity/UserCount.entity";
import { User } from "../../entity/User.entity";

export class AdminUserController {
  
    static async getUserCounts(_: Request, res: Response) {
      const data = cache.get("data");
      if (data) {
        console.log("serving from cache");
        res.status(200).json({
          data,
        });
        return;
      } else {
        console.log("serving from db");
        const userCountRepository = AppDataSource.getRepository(UserCount);
        const loginCounts = await userCountRepository
          .createQueryBuilder("user_count")
          .select("TO_CHAR(user_count.login_date, 'YYYY-MM-DD')", "date")
          .addSelect("COUNT(user_count.id)", "total_login_users")
          .where("user_count.login_date >= CURRENT_DATE - INTERVAL '10 days'")
          .groupBy("user_count.login_date")
          .orderBy("date", "ASC")
          .getRawMany();
      
        cache.put("data", loginCounts, 6000);
        res.status(200).json({
          data: loginCounts,
        });
        return;
      }
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