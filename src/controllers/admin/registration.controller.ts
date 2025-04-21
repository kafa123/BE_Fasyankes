import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Patient } from "../../entity/Patient.entity";
import { PatientDetail } from "../../entity/PatientDetail.entity";

export class RegistrationController {

    static async create(req: Request, res: Response): Promise<void> {
        try {
          const {
            nik,
            name,
            gender,
            date_of_birth,
            place_of_birth,
            phone_number,
            address,
            province,
            city,
            district,
            valueBelief,
            privacyRequest,
            healthInformationPatient,
            type_of_insurance,
            educational_level,
            blood_type,
            religion,
            marriage_status,
            profession,
            ethnic,
            language,
            disability,
            insurance_number,
            simulation_id
          } = req.body;
      
          const patientRepo = AppDataSource.getRepository(Patient);
          const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
      
          const newPatient = patientRepo.create({
            simulation_id,
            nik,
            name,
            gender,
            date_of_birth,
            place_of_birth,
            phone_number,
            address,
            province,
            city,
            district,
          });
      
          const savedPatient = await patientRepo.save(newPatient);
      
          const newPatientDetail = patientDetailRepo.create({
            patient_id: savedPatient.id,
            type_of_insurance,
            educational_level,
            blood_type,
            religion,
            marriage_status,
            profession,
            ethnic,
            language,
            disability,
            insurance_number,
          });
      
          await patientDetailRepo.save(newPatientDetail);
      
          res.status(201).json({ message: "Patient    successfully", patient: savedPatient });
        } catch (error) {
          console.error("Error creating patient:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      }      
}