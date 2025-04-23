import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Patient } from "../../entity/Patient.entity";
import { PatientDetail } from "../../entity/PatientDetail.entity";
import { ValueBelief } from "../../entity/ValueBelief.entity";
import { PrivacyRequest } from "../../entity/PrivacyRequest.entity";

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
        value_belief,
        privacy_request,
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
      const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);

      const existing = await patientRepo.findOneBy({ simulation_id });
      if (existing) {
        res.status(400).json({ message: "Simulation already has a patient." });
      }

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

      let newValueBelief = null;
      if (value_belief != null && value_belief !== "") {
        newValueBelief = valueBeliefRepo.create({
          patient_id: savedPatient.id,
          value_belief
        });
        await valueBeliefRepo.save(newValueBelief);
      }

      let newPrivacyRequest = null;
      if (privacy_request != null && privacy_request !== "") {
        newPrivacyRequest = privacyRequestRepo.create({
          patient_id: savedPatient.id,
          privacy_request
        });
        await privacyRequestRepo.save(newPrivacyRequest);
      }

      res.status(201).json({
        message: "Patient successfully created",
        patient: savedPatient,
        patient_detail: newPatientDetail,
        value_belief: newValueBelief,
        privacy_request: newPrivacyRequest
      });

    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(500).json({ message: error });
    }
  }


  static async getOne(req: Request, res: Response): Promise<void> {
    try {
      const patientRepo = AppDataSource.getRepository(Patient);
      const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
      const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
      const patient = await patientRepo.findOneBy({ simulation_id: parseInt(req.params.id) });
      if (!patient) {
        res.status(404).json({ error: "patient not found" });
        return;
      }
      const patient_detail = await patientDetailRepo.findOneBy({ patient_id: patient.id })
      const value_belief = await valueBeliefRepo.findOneBy({ patient_id: patient.id })
      const privacy_request = await privacyRequestRepo.findOneBy({ patient_id: patient.id })

      res.status(200).json({
        data: patient,
        patient_detail: patient_detail ?? null,
        value_belief: value_belief ?? null,
        privacy_request: privacy_request ?? null
      });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error", Error: e });
    }
  }
}