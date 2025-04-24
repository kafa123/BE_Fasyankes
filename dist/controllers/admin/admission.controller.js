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
exports.AdmissionController = void 0;
const data_source_1 = require("../../data-source");
const PatientVisitData_entity_1 = require("../../entity/PatientVisitData.entity");
const PatientReferralData_entity_1 = require("../../entity/PatientReferralData.entity");
const SepData_entity_1 = require("../../entity/SepData.entity");
const Patient_entity_1 = require("../../entity/Patient.entity");
class AdmissionController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patient_id, 
                // Visit Data
                admission_time, clinic, doctor, 
                // Referral Data
                referral_number, referral_date, referrer, PPK_code, referrer_type, admission_note, 
                // SEP Data
                sep_number, reason_for_visit, procedure, assesment, note, accident } = req.body;
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
                const referralRepo = data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData);
                const sepRepo = data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData);
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
                yield visitRepo.save(newVisit);
                yield referralRepo.save(newReferral);
                yield sepRepo.save(newSep);
                res.status(201).json({
                    message: "Patient visit, referral, and SEP data created successfully",
                    data: {
                        visit: newVisit,
                        referral: newReferral,
                        sep: newSep
                    }
                });
            }
            catch (error) {
                console.error("Error creating patient data:", error);
                res.status(500).json({ message: error });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
                const referralRepo = data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData);
                const sepRepo = data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData);
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id: parseInt(req.params.simulation_id) });
                const visitData = yield visitRepo.findOneBy({ patient_id: patient.id });
                const referralData = yield referralRepo.findOneBy({ patient_id: patient.id });
                const sepData = yield sepRepo.findOneBy({ patient_id: patient.id });
                res.status(200).json({
                    data: {
                        visit: visitData !== null && visitData !== void 0 ? visitData : null,
                        referral: referralData !== null && referralData !== void 0 ? referralData : null,
                        sep: sepData !== null && sepData !== void 0 ? sepData : null
                    }
                });
            }
            catch (e) {
                res.status(500).json({ message: "Internal Server Error", error: e });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_id = parseInt(req.params.simulation_id);
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id });
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
                const referralRepo = data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData);
                const sepRepo = data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData);
                yield visitRepo.update({ patient_id: patient.id }, req.body.visit || {});
                yield referralRepo.update({ patient_id: patient.id }, req.body.referral || {});
                yield sepRepo.update({ patient_id: patient.id }, req.body.sep || {});
                res.status(200).json({ message: "Admission data updated successfully" });
            }
            catch (e) {
                res.status(500).json({ message: "Failed to update data", error: e });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_id = parseInt(req.params.simulation_id);
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id: simulation_id });
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
                const referralRepo = data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData);
                const sepRepo = data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData);
                yield visitRepo.delete({ patient_id: patient.id });
                yield referralRepo.delete({ patient_id: patient.id });
                yield sepRepo.delete({ patient_id: patient.id });
                res.status(200).json({ message: "Admission data deleted successfully" });
            }
            catch (e) {
                res.status(500).json({ message: "Failed to delete data", error: e });
            }
        });
    }
}
exports.AdmissionController = AdmissionController;
//# sourceMappingURL=admission.controller.js.map