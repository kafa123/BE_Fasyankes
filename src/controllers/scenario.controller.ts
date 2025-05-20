import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Scenario } from "../entity/Scenario.entity";

export class ScenarioUserController {

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Scenario);

      const simulationId = parseInt(req.params.id); 
      if (isNaN(simulationId)) {
        res.status(400).json({ error: "Invalid simulation ID" });
        return;
      }

      const scenarios = await repo.find({ where: { simulation_id: simulationId } });

      if (scenarios.length === 0) {
        res.status(404).json({ error: "No scenarios found for this simulation" });
        return;
      }

      res.status(200).json({ data: scenarios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


  static async getOne(req: Request, res: Response): Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Scenario);
      const scenario = await repo.findOneBy({ id: parseInt(req.params.id) });
      if (!scenario)
        res.status(404).json({ error: "Scenario not found" });
      res.status(200).json({ data: scenario });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

}