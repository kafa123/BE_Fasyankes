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
class RegistrationController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nik, name, gender, date_of_birth, place_of_birth, phone_number, address, province, city, district, value_belief, privacy_request, type_of_insurance, educational_level, blood_type, religion, marriage_status, profession, ethnic, language, disability, insurance_number, simulation_id } = req.body;
                const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
                const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
                const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
                const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
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
                const savedPatient = yield patientRepo.save(newPatient);
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
                yield patientDetailRepo.save(newPatientDetail);
                let newValueBelief = null;
                if (value_belief != null && value_belief !== "") {
                    newValueBelief = valueBeliefRepo.create({
                        patient_id: savedPatient.id,
                        value_belief
                    });
                    yield valueBeliefRepo.save(newValueBelief);
                }
                let newPrivacyRequest = null;
                if (privacy_request != null && privacy_request !== "") {
                    newPrivacyRequest = privacyRequestRepo.create({
                        patient_id: savedPatient.id,
                        privacy_request
                    });
                    yield privacyRequestRepo.save(newPrivacyRequest);
                }
                res.status(201).json({
                    message: "Patient successfully created",
                    patient: savedPatient,
                    patient_detail: newPatientDetail,
                    value_belief: newValueBelief,
                    privacy_request: newPrivacyRequest
                });
            }
            catch (error) {
                console.error("Error creating patient:", error);
                res.status(500).json({ message: error });
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
                const patient = yield patientRepo.findOneBy({ simulation_id: parseInt(req.params.id) });
                if (!patient) {
                    res.status(404).json({ error: "patient not found" });
                    return;
                }
                const patient_detail = yield patientDetailRepo.findOneBy({ patient_id: patient.id });
                const value_belief = yield valueBeliefRepo.findOneBy({ patient_id: patient.id });
                const privacy_request = yield privacyRequestRepo.findOneBy({ patient_id: patient.id });
                res.status(200).json({ data: patient,
                    patient_detail: patient_detail !== null && patient_detail !== void 0 ? patient_detail : null,
                    value_belief: value_belief !== null && value_belief !== void 0 ? value_belief : null,
                    privacy_request: privacy_request !== null && privacy_request !== void 0 ? privacy_request : null });
            }
            catch (e) {
                res.status(500).json({ message: "Internal Server Error", Error: e });
            }
        });
    }
}
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map