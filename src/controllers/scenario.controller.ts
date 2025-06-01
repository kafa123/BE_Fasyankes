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
    const id = req.query.id ? parseInt(req.query.id as string) : undefined;
    const simulation_id = req.query.simulation_id ? parseInt(req.query.simulation_id as string) : undefined;
    const order = req.query.order ? parseInt(req.query.order as string) : undefined;

    const scenarioRepo = AppDataSource.getRepository(Scenario);
    const answerRepo = AppDataSource.getRepository(Answer);

    let scenario = null;

    if (id) {
      scenario = await scenarioRepo.findOneBy({ id });
    } else if (simulation_id && order) {
      scenario = await scenarioRepo.findOneBy({ simulation_id:simulation_id, order:order });
    } else {
      res.status(400).json({
        error: "Provide either 'id' (as param) or both 'simulation_id' and 'order' (as query params)"
      });
      return;
    }

    if (!scenario) {
      res.status(200).json({ error: "Scenario not found" });
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
      answer,
      component
    });

  } catch (e: any) {
    res.status(500).json({ message: "error", error: e.message });
  }
}


}