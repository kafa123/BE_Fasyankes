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
class RegistrationController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nik, name, gender, date_of_birth, place_of_birth, phone_number, address, province, city, district, valueBelief, privacyRequest, healthInformationPatient, type_of_insurance, educational_level, blood_type, religion, marriage_status, profession, ethnic, language, disability, insurance_number, simulation_id } = req.body;
                const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
                const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
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
                res.status(201).json({ message: "Patient    successfully", patient: savedPatient });
            }
            catch (error) {
                console.error("Error creating patient:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map