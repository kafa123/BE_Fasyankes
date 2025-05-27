import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Scenario } from "../entity/Scenario.entity";
import { Simulation } from "../entity/Simulation.entity";
import { ComponentService } from "../services/ComponentService";
import { Answer } from "../entity/Answer.entity";

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
        res.status(200).json({ message: "No scenarios found for this simulation" });
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
    const scenario_id = parseInt(req.params.id);

    const scenarioRepo = AppDataSource.getRepository(Scenario);
    const answerRepo = AppDataSource.getRepository(Answer);

    const scenario = await scenarioRepo.findOneBy({ id:scenario_id });

    if (!scenario) {
      res.status(404).json({ error: "Scenario not found" });
      return;
    }

    const simulation = await AppDataSource.getRepository(Simulation).findOneByOrFail({
      id: scenario.simulation_id
    });

    const answer = await answerRepo.findOneBy({
      scenario_id: scenario.id
    });

    let component = null;
    switch (scenario.component) {
      case "pendaftaran":
        component = await ComponentService.getPatient(simulation.id);
        break;
      case "admission-rawat-jalan":
        component = await ComponentService.getAdmissionOutPatient(simulation.id);
        break;
      case "admission-rawat-inap":
        component = await ComponentService.getAdmissionInpatient(simulation.id);
        break;
      case "admission-gawat-darurat":
        component = await ComponentService.getAdmissionIGD(simulation.id);
        break;
    }

    res.status(200).json({
      data: scenario,
      answer: answer,
      component: component
    });

  } catch (e) {
    res.status(500).json({ message: "error", error: e.message });
  }
}


}