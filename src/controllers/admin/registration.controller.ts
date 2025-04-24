import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Patient } from "../../entity/Patient.entity";
import { PatientDetail } from "../../entity/PatientDetail.entity";
import { ValueBelief } from "../../entity/ValueBelief.entity";
import { PrivacyRequest } from "../../entity/PrivacyRequest.entity";
import { HealthInformationPatient } from "../../entity/HealthInformationPatient.entity";

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
        simulation_id,
        family_name_1,
        family_relationship_1,
        phone_number_family_1,
        family_name_2,
        family_relationship_2,
        phone_number_family_2,
        family_name_3,
        family_relationship_3,
        phone_number_family_3,
      } = req.body;

      const patientRepo = AppDataSource.getRepository(Patient);
      const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
      const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
      const healthInformationPatientsRepo = AppDataSource.getRepository(HealthInformationPatient);

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

      let newKeluarga1Request = null;
      let newKeluarga2Request = null;
      let newKeluarga3Request = null;

      if(family_name_1 != null && family_name_1 !==""){
        newKeluarga1Request = healthInformationPatientsRepo.create({
          name:family_name_1,
          patient_id: savedPatient.id,
          family_relationship:family_relationship_1,
          phone_number:phone_number_family_1
        });
        await healthInformationPatientsRepo.save(newKeluarga1Request);
      }
      if(family_name_2 != null && family_name_2 !==""){
        newKeluarga2Request = healthInformationPatientsRepo.create({
          name:family_name_2,
          patient_id: savedPatient.id,
          family_relationship:family_relationship_2,
          phone_number:phone_number_family_2
        });
        await healthInformationPatientsRepo.save(newKeluarga2Request);
      }
      if(family_name_3 != null && family_name_3 !==""){
        newKeluarga3Request = healthInformationPatientsRepo.create({
          name:family_name_3,
          patient_id: savedPatient.id,
          family_relationship:family_relationship_3,
          phone_number:phone_number_family_3
        });
        await healthInformationPatientsRepo.save(newKeluarga3Request);
      }

      res.status(201).json({
        message: "Patient successfully created",
        patient: savedPatient,
        patient_detail: newPatientDetail,
        value_belief: newValueBelief,
        privacy_request: newPrivacyRequest,
        health_information_family_1: newKeluarga1Request,
        health_information_family_2: newKeluarga2Request,
        health_information_family_3: newKeluarga3Request,
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