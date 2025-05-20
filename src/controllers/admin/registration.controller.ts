import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Patient } from "../../entity/Patient.entity";
import { PatientDetail } from "../../entity/PatientDetail.entity";
import { ValueBelief } from "../../entity/ValueBelief.entity";
import { PrivacyRequest } from "../../entity/PrivacyRequest.entity";
import { HealthInformationPatient } from "../../entity/HealthInformationPatient.entity";
import { ComponentService, CreatePatientInput } from "../../services/ComponentService";

export class RegistrationController {

  static async create(req: Request, res: Response): Promise<void> {
    try {

      const{type} = req.body;
    const patientData: CreatePatientInput = req.body;

    // Now call service with typed data
    const savedPatient = await ComponentService.createPatient(patientData);
  
      // const patientRepo = AppDataSource.getRepository(Patient);
      // const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
      // const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      // const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
      // const healthInfoRepo = AppDataSource.getRepository(HealthInformationPatient);
  
      // const existing = await patientRepo.findOneBy({ simulation_id: patient.simulation_id });
      // if (existing) {
      //   res.status(400).json({ message: "Simulation already has a patient." });
      //   return;
      // }
  
      // const newPatient = patientRepo.create(patient);
      // const savedPatient = await patientRepo.save(newPatient);
      // const existingPatient = await patientRepo.findOneBy({ simulation_id: patient.simulation_id });
  
      // if (patient_detail) {
      //   const newPatientDetail = patientDetailRepo.create({
      //     ...patient_detail,
      //     patient_id: existingPatient.id,
      //   });
      //   await patientDetailRepo.save(newPatientDetail);
      // }
  
      // if (value_belief?.value_belief) {
      //   const newVB = valueBeliefRepo.create({
      //     patient_id: existingPatient.id,
      //     value_belief: value_belief.value_belief,
      //   });
      //   await valueBeliefRepo.save(newVB);
      // }
  
      // if (privacy_request?.privacy_request) {
      //   const newPR = privacyRequestRepo.create({
      //     patient_id: existingPatient.id,
      //     privacy_request: privacy_request.privacy_request,
      //   });
      //   await privacyRequestRepo.save(newPR);
      // }
  
      // if (Array.isArray(family_members)) {
      //   for (const fm of family_members) {
      //     if (fm.name) {
      //       const newFM = healthInfoRepo.create({
      //         patient_id: existingPatient.id, 
      //         name: fm.name,
      //         family_relationship: fm.family_relationship,
      //         phone_number: fm.phone_number,
      //       });
      //       await healthInfoRepo.save(newFM);
      //     }
      //   }
      // }
  
      res.status(201).json({ message: "Patient successfully created" });
    } catch (error) {
      console.error("Error creating patient:", error);
  
    }}

  static async getOne(req: Request, res: Response): Promise<void> {
    try {
      const patientRepo = AppDataSource.getRepository(Patient);
      const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
      const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
      const healthInfoRepo = AppDataSource.getRepository(HealthInformationPatient)
      const patient = await patientRepo.findOneBy({ simulation_id: parseInt(req.params.id) });
      if (!patient) {
        res.status(404).json({ error: "patient not found" });
        return;
      }
      const patient_detail = await patientDetailRepo.findOneBy({ patient_id: patient.id })
      const value_belief = await valueBeliefRepo.findOneBy({ patient_id: patient.id })
      const privacy_request = await privacyRequestRepo.findOneBy({ patient_id: patient.id })
      const health_information_patients = await healthInfoRepo.findBy({patient_id: patient.id})

      res.status(200).json({
        data: patient,
        patient_detail: patient_detail ?? null,
        value_belief: value_belief ?? null,
        privacy_request: privacy_request ?? null,
        healthInfo: health_information_patients ?? null,
      });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error", Error: e });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.id);
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
      } = req.body;
  
      const patientRepo = AppDataSource.getRepository(Patient);
      const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
      const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
  
      const patient = await patientRepo.findOneBy({ simulation_id });
      if (!patient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }
  
      patientRepo.merge(patient, {
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
      const updatedPatient = await patientRepo.save(patient);
  
      let patientDetail = await patientDetailRepo.findOneBy({ patient_id: patient.id });
      if (patientDetail) {
        patientDetailRepo.merge(patientDetail, {
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
        await patientDetailRepo.save(patientDetail);
      }
  
      let vb = await valueBeliefRepo.findOneBy({ patient_id: patient.id });
      if (vb) {
        vb.value_belief = value_belief;
        await valueBeliefRepo.save(vb);
      } else if (value_belief) {
        vb = valueBeliefRepo.create({ patient_id: patient.id, value_belief });
        await valueBeliefRepo.save(vb);
      }
  
      let pr = await privacyRequestRepo.findOneBy({ patient_id: patient.id });
      if (pr) {
        pr.privacy_request = privacy_request;
        await privacyRequestRepo.save(pr);
      } else if (privacy_request) {
        pr = privacyRequestRepo.create({ patient_id: patient.id, privacy_request });
        await privacyRequestRepo.save(pr);
      }
  
      res.status(200).json({
        message: "Patient updated successfully",
        patient: updatedPatient,
      });
    } catch (error) {
      console.error("Error updating patient:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
  
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const simulation_id = parseInt(req.params.id);
  
      const patientRepo = AppDataSource.getRepository(Patient);
      const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
      const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
  
      const patient = await patientRepo.findOneBy({ simulation_id });
      if (!patient) {
        res.status(404).json({ message: "Patient not found" });
        return;
      }
  
      await privacyRequestRepo.delete({ patient_id: patient.id });
      await valueBeliefRepo.delete({ patient_id: patient.id });
      await patientDetailRepo.delete({ patient_id: patient.id });
      await patientRepo.delete({ id: patient.id });
  
      res.status(200).json({ message: "Patient and related data deleted successfully" });
    } catch (error) {
      console.error("Error deleting patient:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
  
}