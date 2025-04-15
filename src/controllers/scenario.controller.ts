import { Request,Response } from "express";
import { AppDataSource } from "../data-source";
import { Scenario } from "../entity/Scenario.entity";

export class ScenarioUserController{

    static async getAll(req: Request, res: Response):Promise<void> {
        try {
          const repo = AppDataSource.getRepository(Scenario);
          const simulations = await repo.find();
          res.status(200).json({ data: simulations });
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    
      static async getOne(req: Request, res: Response):Promise<void> {
        try {
          const repo = AppDataSource.getRepository(Scenario);
          const simulation = await repo.findOneBy({ id: parseInt(req.params.id) });
          if (!simulation)
             res.status(404).json({ error: "Simulation not found" });
          res.status(200).json({ data: simulation });
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error" });
        }
      }

}