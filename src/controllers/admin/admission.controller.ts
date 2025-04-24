import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { PatientVisitData } from "../../entity/PatientVisitData.entity";
import { PatientReferralData } from "../../entity/PatientReferralData.entity";
import { SepData } from "../../entity/SepData.entity";
import { Patient } from "../../entity/Patient.entity";

export class AdmissionController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        patient_id,
        // Visit Data
        admission_time,
        clinic,
        doctor,
        // Referral Data
        referral_number,
        referral_date,
        referrer,
        PPK_code,
        referrer_type,
        admission_note,
        // SEP Data
        sep_number,
        reason_for_visit,
        procedure,
        assesment,
        note,
        accident
      } = req.body;

      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);

      const newVisit = visitRepo.create({
        patient_id,
        admission_time,
        clinic,
        doctor
      });

      const newReferral = referralRepo.create({
        patient_id,
        referral_number,
        referral_date,
        referrer,
        PPK_code,
        referrer_type,
        admission_note
      });

      const newSep = sepRepo.create({
        patient_id,
        sep_number,
        reason_for_visit,
        procedure,
        assesment,
        note,
        accident
      });

      await visitRepo.save(newVisit);
      await referralRepo.save(newReferral);
      await sepRepo.save(newSep);

      res.status(201).json({
        message: "Patient visit, referral, and SEP data created successfully",
        data: {
          visit: newVisit,
          referral: newReferral,
          sep: newSep
        }
      });

    } catch (error) {
      console.error("Error creating patient data:", error);
      res.status(500).json({ message: error });
    }
  }

  static async getOne(req:Request, res:Response):Promise<void>{
    try {
      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({simulation_id: parseInt(req.params.simulation_id)});

      const visitData = await visitRepo.findOneBy({patient_id: patient.id});
      const referralData = await referralRepo.findOneBy({patient_id: patient.id});
      const sepData = await sepRepo.findOneBy({patient_id: patient.id});

      res.status(200).json({
        data: {
          visit: visitData ?? null,
          referral: referralData ?? null,
          sep: sepData ?? null
        }
      });
      
    } catch (e) {
      res.status(500).json({message:"Internal Server Error", error:e});
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.simulation_id);
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });

      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);

      await visitRepo.update({ patient_id: patient.id }, req.body.visit || {});
      await referralRepo.update({ patient_id: patient.id }, req.body.referral || {});
      await sepRepo.update({ patient_id: patient.id }, req.body.sep || {});

      res.status(200).json({ message: "Admission data updated successfully" });

    } catch (e) {
      res.status(500).json({ message: "Failed to update data", error: e });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.simulation_id);
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id:simulation_id });

      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);

      await visitRepo.delete({ patient_id: patient.id });
      await referralRepo.delete({ patient_id: patient.id });
      await sepRepo.delete({ patient_id: patient.id });

      res.status(200).json({ message: "Admission data deleted successfully" });

    } catch (e) {
      res.status(500).json({ message: "Failed to delete data", error: e });
    }
  }
}
