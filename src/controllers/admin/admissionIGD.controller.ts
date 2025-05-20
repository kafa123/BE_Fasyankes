import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { PatientVisitIGD } from "../../entity/PatientVisitIGDData.entity";
import { DocumentPatient } from "../../entity/DocumentPatient.entity";
import { Patient } from "../../entity/Patient.entity";

export class AdmissionIGDController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { simulation_id, visit, document } = req.body;

      const simulation = await AppDataSource.getRepository(Patient).findOneByOrFail({ id: simulation_id });
    
      const visitRepo = AppDataSource.getRepository(PatientVisitIGD);
      const documentRepo = AppDataSource.getRepository(DocumentPatient);

      const visitData = visitRepo.create({ simulation_id, ...visit });
      const documentData = documentRepo.create({ simulation_id, ...document });

      await visitRepo.save(visitData);
      await documentRepo.save(documentData);

      res.status(201).json({
        message: "Data created successfully",
        data: { visit: visitData,  document: documentData }
      });

    } catch (error) {
      res.status(500).json({ message: "Failed to create data", error });
    }
  }

  static async getOne(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.simulation_id);

      const visit = await AppDataSource.getRepository(PatientVisitIGD).findOneBy({ simulation_id: simulation_id });
      const document = await AppDataSource.getRepository(DocumentPatient).findOneBy({ simulation_id: simulation_id });

      res.status(200).json({ data: { simulation_id: simulation_id, visit, document } });

    } catch (error) {
      res.status(500).json({ message: "Failed to get data", error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.simulation_id);
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });

      const { visit, referral, sep, document } = req.body;

      await AppDataSource.getRepository(PatientVisitIGD).update({ simulation_id: simulation_id }, visit);
      await AppDataSource.getRepository(DocumentPatient).update({ simulation_id }, document);

      res.status(200).json({ message: "Data updated successfully" });

    } catch (error) {
      console.error("Update error:", error); 

      res.status(500).json({
        message: "Failed to update data",
        error: error instanceof Error ? error.message : error
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.simulation_id);

      await AppDataSource.getRepository(PatientVisitIGD).delete({ simulation_id: simulation_id });
      await AppDataSource.getRepository(DocumentPatient).delete({ simulation_id: simulation_id });

      res.status(200).json({ message: "Data deleted successfully" });

    } catch (error) {
      res.status(500).json({ message: "Failed to delete data", error });
    }
  }
}
