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
exports.AdmissionIGDController = void 0;
const data_source_1 = require("../../data-source");
const PatientVisitIGDData_entity_1 = require("../../entity/PatientVisitIGDData.entity");
const DocumentPatient_entity_1 = require("../../entity/DocumentPatient.entity");
const Patient_entity_1 = require("../../entity/Patient.entity");
class AdmissionIGDController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { simulation_id, visit, document } = req.body;
                const simulation = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ id: simulation_id });
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD);
                const documentRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
                const visitData = visitRepo.create(Object.assign({ simulation_id }, visit));
                const documentData = documentRepo.create(Object.assign({ simulation_id }, document));
                yield visitRepo.save(visitData);
                yield documentRepo.save(documentData);
                res.status(201).json({
                    message: "Data created successfully",
                    data: { visit: visitData, document: documentData }
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
                const visit = yield data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD).findOneBy({ simulation_id: simulation_id });
                const document = yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).findOneBy({ simulation_id: simulation_id });
                res.status(200).json({ data: { simulation_id: simulation_id, visit, document } });
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
                yield data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD).update({ simulation_id: simulation_id }, visit);
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
                yield data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD).delete({ simulation_id: simulation_id });
                yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).delete({ simulation_id: simulation_id });
                res.status(200).json({ message: "Data deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Failed to delete data", error });
            }
        });
    }
}
exports.AdmissionIGDController = AdmissionIGDController;
//# sourceMappingURL=admissionIGD.controller.js.map