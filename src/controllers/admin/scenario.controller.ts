import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Scenario } from "../../entity/Scenario.entity";

export class ScenarioController {
  
  static async create(req: Request, res: Response):Promise<void> {
    try {
      const { patient_type, 
        category, 
        case_type, 
        payment_method, 
        case_description, 
        diagnose } = req.body;
      if (!patient_type || !category || !case_type || !payment_method || !case_description || !diagnose) {
        res.status(400).json({ error: "All fields are required" });
      }

      const repo = AppDataSource.getRepository(Scenario);
      const simulation = repo.create(req.body);
      await repo.save(simulation);
      res.status(201).json({ message: "Simulation created successfully", simulation });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }


  static async update(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Scenario);
      let simulation = await repo.findOneBy({ id: parseInt(req.params.id) });
      if (!simulation)
        res.status(404).json({ error: "Simulation not found" });
      repo.merge(simulation, req.body);
      await repo.save(simulation);
      res.status(200).json({ message: "Simulation updated successfully", simulation });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async delete(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Scenario);
      const result = await repo.delete(req.params.id);
      if (result.affected === 0)
        res.status(404).json({ error: "Simulation not found" });
      res.status(200).json({ message: "Simulation deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
