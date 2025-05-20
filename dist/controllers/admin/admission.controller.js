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
const DocumentPatient_entity_1 = require("../../entity/DocumentPatient.entity");
const Patient_entity_1 = require("../../entity/Patient.entity");
class AdmissionController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patient_id, visit, referral, sep, document } = req.body;
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ id: patient_id });
                const simulation_id = patient.simulation_id;
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
                const referralRepo = data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData);
                const sepRepo = data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData);
                const documentRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
                const visitData = visitRepo.create(Object.assign({ patient_id }, visit));
                const referralData = referralRepo.create(Object.assign({ patient_id }, referral));
                const sepData = sepRepo.create(Object.assign({ patient_id }, sep));
                const documentData = documentRepo.create(Object.assign({ simulation_id }, document));
                yield visitRepo.save(visitData);
                yield referralRepo.save(referralData);
                yield sepRepo.save(sepData);
                yield documentRepo.save(documentData);
                res.status(201).json({
                    message: "Data created successfully",
                    data: { visit: visitData, referral: referralData, sep: sepData, document: documentData }
                });
            }
            catch (error) {
                res.status(500).json({ message: "Failed to create data", error });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_id = parseInt(req.params.simulation_id);
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id });
                const visit = yield data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData).findOneBy({ patient_id: patient.id });
                const referral = yield data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData).findOneBy({ patient_id: patient.id });
                const sep = yield data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData).findOneBy({ patient_id: patient.id });
                const document = yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).findOneBy({ simulation_id });
                res.status(200).json({ data: { patient_id: patient.id, visit, referral, sep, document } });
            }
            catch (error) {
                res.status(500).json({ message: "Failed to get data", error });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_id = parseInt(req.params.simulation_id);
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id });
                const { visit, referral, sep, document } = req.body;
                yield data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData).update({ patient_id: patient.id }, visit);
                yield data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData).update({ patient_id: patient.id }, referral);
                yield data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData).update({ patient_id: patient.id }, sep);
                yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).update({ simulation_id }, document);
                res.status(200).json({ message: "Data updated successfully" });
            }
            catch (error) {
                console.error("Update error:", error);
                res.status(500).json({
                    message: "Failed to update data",
                    error: error instanceof Error ? error.message : error
                });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_id = parseInt(req.params.simulation_id);
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id });
                yield data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData).delete({ patient_id: patient.id });
                yield data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData).delete({ patient_id: patient.id });
                yield data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData).delete({ patient_id: patient.id });
                yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).delete({ simulation_id });
                res.status(200).json({ message: "Data deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete data", error });
            }
        });
    }
}
exports.AdmissionController = AdmissionController;
//# sourceMappingURL=admission.controller.js.map