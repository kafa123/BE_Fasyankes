"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
const data_source_1 = require("../../data-source");
const Patient_entity_1 = require("../../entity/Patient.entity");
const PatientDetail_entity_1 = require("../../entity/PatientDetail.entity");
const ValueBelief_entity_1 = require("../../entity/ValueBelief.entity");
const PrivacyRequest_entity_1 = require("../../entity/PrivacyRequest.entity");
const HealthInformationPatient_entity_1 = require("../../entity/HealthInformationPatient.entity");
const ComponentService_1 = require("../../services/ComponentService");
class RegistrationController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.body;
                const patientData = req.body;
                // Now call service with typed data
                const savedPatient = yield ComponentService_1.ComponentService.createPatient(patientData);
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
            }
            catch (error) {
                console.error("Error creating patient:", error);
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
                const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
                const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
                const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
                const healthInfoRepo = data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient);
                const patient = yield patientRepo.findOneBy({ simulation_id: parseInt(req.params.id) });
                if (!patient) {
                    res.status(404).json({ error: "patient not found" });
                    return;
                }
                const patient_detail = yield patientDetailRepo.findOneBy({ patient_id: patient.id });
                const value_belief = yield valueBeliefRepo.findOneBy({ patient_id: patient.id });
                const privacy_request = yield privacyRequestRepo.findOneBy({ patient_id: patient.id });
                const health_information_patients = yield healthInfoRepo.findBy({ patient_id: patient.id });
                res.status(200).json({
                    data: patient,
                    patient_detail: patient_detail !== null && patient_detail !== void 0 ? patient_detail : null,
                    value_belief: value_belief !== null && value_belief !== void 0 ? value_belief : null,
                    privacy_request: privacy_request !== null && privacy_request !== void 0 ? privacy_request : null,
                    healthInfo: health_information_patients !== null && health_information_patients !== void 0 ? health_information_patients : null,
                });
            }
            catch (e) {
                res.status(500).json({ message: "Internal Server Error", Error: e });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_id = parseInt(req.params.id);
                const { nik, name, gender, date_of_birth, place_of_birth, phone_number, address, province, city, district, value_belief, privacy_request, type_of_insurance, educational_level, blood_type, religion, marriage_status, profession, ethnic, language, disability, insurance_number, } = req.body;
                const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
                const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
                const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
                const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
                const patient = yield patientRepo.findOneBy({ simulation_id });
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
                const updatedPatient = yield patientRepo.save(patient);
                let patientDetail = yield patientDetailRepo.findOneBy({ patient_id: patient.id });
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
                    yield patientDetailRepo.save(patientDetail);
                }
                let vb = yield valueBeliefRepo.findOneBy({ patient_id: patient.id });
                if (vb) {
                    vb.value_belief = value_belief;
                    yield valueBeliefRepo.save(vb);
                }
                else if (value_belief) {
                    vb = valueBeliefRepo.create({ patient_id: patient.id, value_belief });
                    yield valueBeliefRepo.save(vb);
                }
                let pr = yield privacyRequestRepo.findOneBy({ patient_id: patient.id });
                if (pr) {
                    pr.privacy_request = privacy_request;
                    yield privacyRequestRepo.save(pr);
                }
                else if (privacy_request) {
                    pr = privacyRequestRepo.create({ patient_id: patient.id, privacy_request });
                    yield privacyRequestRepo.save(pr);
                }
                res.status(200).json({
                    message: "Patient updated successfully",
                    patient: updatedPatient,
                });
            }
            catch (error) {
                console.error("Error updating patient:", error);
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_id = parseInt(req.params.id);
                const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
                const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
                const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
                const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
                const patient = yield patientRepo.findOneBy({ simulation_id });
                if (!patient) {
                    res.status(404).json({ message: "Patient not found" });
                    return;
                }
                yield privacyRequestRepo.delete({ patient_id: patient.id });
                yield valueBeliefRepo.delete({ patient_id: patient.id });
                yield patientDetailRepo.delete({ patient_id: patient.id });
                yield patientRepo.delete({ id: patient.id });
                res.status(200).json({ message: "Patient and related data deleted successfully" });
            }
            catch (error) {
                console.error("Error deleting patient:", error);
                res.status(500).json({ message: "Internal Server Error", error });
            }
        });
    }
}
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map