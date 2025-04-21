import { Request,Response } from "express";
import { AppDataSource } from "../../data-source";
import { Simulation } from "../../entity/Simulation.entity";
import { PersonalCase } from "../../entity/PersonalCase.entity";

export class UserTPPRJSimulationController{

  static async getAll(req: Request, res: Response): Promise<void> {
    try {

      const userId = req["currentUser"]?.id;

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const repo = AppDataSource.getRepository(PersonalCase);

      const personalCases = await repo.find({
        where: {
          user_id: userId, 
          simulation: {
            category: "rawat_jalan" 
          }
        },
        relations: {
          simulation: true
        }
      });

      res.status(200).json({ data: personalCases });
    } catch (error) {
      console.error("Error fetching personal cases:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
    
  static async getOne(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Simulation);
      const simulation = await repo.findOneBy({ id: parseInt(req.params.id) });
      if (!simulation){
        res.status(404).json({ error: "Simulation not found" });
        return;
      }
          
      res.status(200).json({ data: simulation });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

}