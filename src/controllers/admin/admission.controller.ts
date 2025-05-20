import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { PatientVisitData } from "../../entity/PatientVisitData.entity";
import { PatientReferralData } from "../../entity/PatientReferralData.entity";
import { SepData } from "../../entity/SepData.entity";
import { DocumentPatient } from "../../entity/DocumentPatient.entity";
import { Patient } from "../../entity/Patient.entity";

export class AdmissionController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { patient_id, visit, referral, sep, document } = req.body;

      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ id: patient_id });
      const simulation_id = patient.simulation_id;

      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);
      const documentRepo = AppDataSource.getRepository(DocumentPatient);

      const visitData = visitRepo.create({ patient_id, ...visit });
      const referralData = referralRepo.create({ patient_id, ...referral });
      const sepData = sepRepo.create({ patient_id, ...sep });
      const documentData = documentRepo.create({ simulation_id, ...document });

      await visitRepo.save(visitData);
      await referralRepo.save(referralData);
      await sepRepo.save(sepData);
      await documentRepo.save(documentData);

      res.status(201).json({
        message: "Data created successfully",
        data: { visit: visitData, referral: referralData, sep: sepData, document: documentData }
      });

    } catch (error) {
      res.status(500).json({ message: "Failed to create data", error });
    }
  }

  static async getOne(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.simulation_id);
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });

      const visit = await AppDataSource.getRepository(PatientVisitData).findOneBy({ patient_id: patient.id });
      const referral = await AppDataSource.getRepository(PatientReferralData).findOneBy({ patient_id: patient.id });
      const sep = await AppDataSource.getRepository(SepData).findOneBy({ patient_id: patient.id });
      const document = await AppDataSource.getRepository(DocumentPatient).findOneBy({ simulation_id });

      res.status(200).json({ data: { patient_id: patient.id, visit, referral, sep, document } });

    } catch (error) {
      res.status(500).json({ message: "Failed to get data", error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.simulation_id);
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });

      const { visit, referral, sep, document } = req.body;

      await AppDataSource.getRepository(PatientVisitData).update({ patient_id: patient.id }, visit);
      await AppDataSource.getRepository(PatientReferralData).update({ patient_id: patient.id }, referral);
      await AppDataSource.getRepository(SepData).update({ patient_id: patient.id }, sep);
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
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });

      await AppDataSource.getRepository(PatientVisitData).delete({ patient_id: patient.id });
      await AppDataSource.getRepository(PatientReferralData).delete({ patient_id: patient.id });
      await AppDataSource.getRepository(SepData).delete({ patient_id: patient.id });
      await AppDataSource.getRepository(DocumentPatient).delete({ simulation_id });

      res.status(200).json({ message: "Data deleted successfully" });

    } catch (error) {
      res.status(500).json({ message: "Failed to delete data", error });
    }
  }
}
