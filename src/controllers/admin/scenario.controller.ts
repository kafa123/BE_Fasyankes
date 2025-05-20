import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Scenario } from "../../entity/Scenario.entity";
import { Answer } from "../../entity/Answer.entity";

export class ScenarioController {
  
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        simulation_id,
        scenario,
        question,
        component,
        answer_text,
        order 
      } = req.body;
  
      if (!scenario || !question || !component || !order) {
        res.status(400).json({ error: "Required fields are missing" });
        return;
      }
  
      const scenarioRepo = AppDataSource.getRepository(Scenario);
      const answerRepo = AppDataSource.getRepository(Answer);
  
      await scenarioRepo
        .createQueryBuilder()
        .update(Scenario)
        .set({ order: () => `"order" + 1` })
        .where("simulation_id = :simulation_id AND \"order\" >= :order", { simulation_id, order })
        .execute();
  
      const newScenario = scenarioRepo.create({
        simulation_id,
        scenario,
        question,
        component,
        order
      });
  
      const savedScenario = await scenarioRepo.save(newScenario);
  
      const answerImagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
      const newAnswer = answerRepo.create({
        scenario_id: savedScenario.id,
        answer_text,
        answer_image: answerImagePath,
      });
  
      const savedAnswer = await answerRepo.save(newAnswer);
  
      res.status(201).json({
        message: "Scenario and answer created successfully",
        scenario: savedScenario,
        answer: savedAnswer
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" ,message:error});
    }
  }
  


  static async update(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Scenario);
      let scenario = await repo.findOneBy({ id: parseInt(req.params.id) });
      if (!scenario)
        res.status(404).json({ error: "Scenario not found" });
      repo.merge(scenario, req.body);
      await repo.save(scenario);
      res.status(200).json({ message: "Scenario updated successfully", scenario });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async delete(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Scenario);
      const result = await repo.delete(req.params.id);
      if (result.affected === 0)
        res.status(404).json({ error: "SCenario not found" });
      res.status(200).json({ message: "Scenario deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  
}
