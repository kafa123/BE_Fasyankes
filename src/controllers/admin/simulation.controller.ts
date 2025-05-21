import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Simulation } from "../../entity/Simulation.entity";
import { User } from "../../entity/User.entity";
import { PersonalCase } from "../../entity/PersonalCase.entity";

export class AdminSimulationController {

  static async get(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Simulation);
      let simulations = await repo.find({
        where: { category: req.params.category },
      });

      res.status(200).json({ data: simulations });
      return;
    } catch (error) {
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
  
  static async create(req: Request, res: Response):Promise<void> {
    try {
      const { patient_type, 
        case_type,
        category, 
        perujuk,
        payment_method, 
        symptoms,
        case_description, 
        diagnose } = req.body;

      if (!patient_type || !case_type || !category || !payment_method || !case_description || !diagnose) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      const repo = AppDataSource.getRepository(Simulation);
      const userRepo = AppDataSource.getRepository(User);
      const personalCaseRepo = AppDataSource.getRepository(PersonalCase);

      const simulation = repo.create({
        patient_type,
        case_type,
        payment_method,
        symptoms,
        case_description,
        diagnose,
        category,
        perujuk
      });
      
      await repo.save(simulation);

      const users = await userRepo.find({
        where: { role: "user" }
      });

      const personalCases = users.map((user) => {
        return personalCaseRepo.create({
          simulation_id: simulation.id,
          user_id: user.id,
          checklist: false,
          duration: 0
        });
      });

      await personalCaseRepo.save(personalCases);

      res.status(201).json({ message: "Simulation and personal cases created successfully", simulation });

      return;
    } catch (error) {
      res.status(500).json({ error: error });
      return;
    }
  }


  static async update(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Simulation);
      let simulation = await repo.findOneBy({ id: parseInt(req.params.id) });

      if (!simulation){
        res.status(404).json({ error: "Simulation not found" });
        return;
      }

      repo.merge(simulation, req.body);
      await repo.save(simulation);
      res.status(200).json({ message: "Simulation updated successfully", simulation });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async delete(req: Request, res: Response):Promise<void> {
    try {
      const repo = AppDataSource.getRepository(Simulation);
      const result = await repo.delete(req.params.id);

      if (result.affected === 0){
        res.status(404).json({ error: "Simulation not found" });
        return;
      }
  
      res.status(200).json({ message: "Simulation deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
