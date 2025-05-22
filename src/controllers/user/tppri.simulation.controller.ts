import { Request,Response } from "express";
import { AppDataSource } from "../../data-source";
import { Simulation } from "../../entity/Simulation.entity";
import { PersonalCase } from "../../entity/PersonalCase.entity";

export class UserTPPRISimulationController{

  static async getAll(req: Request, res: Response): Promise<void> {
    try {

      const userId = req["currentUser"]?.id;

      const simulationsRepo = AppDataSource.getRepository(Simulation);

      if (!userId) {
        const simulations = await simulationsRepo.find({
          where: {
              category: "rawat_inap"
          }
        });
        res.status(200).json({ data: simulations });
        return;
      }

      const repo = AppDataSource.getRepository(PersonalCase);

      const personalCases = await repo.find({
        where: {
          user_id: userId, 
          simulation: {
            category: "rawat_inap" 
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