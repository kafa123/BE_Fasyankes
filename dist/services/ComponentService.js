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
exports.ComponentService = void 0;
// services/PatientService.ts
const data_source_1 = require("../data-source");
const Patient_entity_1 = require("../entity/Patient.entity");
const PatientDetail_entity_1 = require("../entity/PatientDetail.entity");
const PatientReferralData_entity_1 = require("../entity/PatientReferralData.entity");
const PatientVisitIGDData_entity_1 = require("../entity/PatientVisitIGDData.entity");
const ValueBelief_entity_1 = require("../entity/ValueBelief.entity");
const HealthInformationPatient_entity_1 = require("../entity/HealthInformationPatient.entity");
const PrivacyRequest_entity_1 = require("../entity/PrivacyRequest.entity");
const PatientVisitData_entity_1 = require("../entity/PatientVisitData.entity");
const SepData_entity_1 = require("../entity/SepData.entity");
const DocumentPatient_entity_1 = require("../entity/DocumentPatient.entity");
const InpatientRecord_entity_1 = require("../entity/InpatientRecord.entity");
const ResponsiblePerson_entity_1 = require("../entity/ResponsiblePerson.entity");
const Simulation_entity_1 = require("../entity/Simulation.entity");
class ComponentService {
    static createPatient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patient, patient_detail, value_belief, privacy_request, family_members, } = data;
            const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
            const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
            const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
            const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
            const healthInfoRepo = data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient);
            const existing = yield patientRepo.findOneBy({ simulation_id: patient.simulation_id });
            if (existing) {
                throw new Error("Simulation already has a patient.");
            }
            const newPatient = patientRepo.create(patient);
            const savedPatient = yield patientRepo.save(newPatient);
            const existingPatient = yield patientRepo.findOneBy({ simulation_id: patient.simulation_id });
            if (patient_detail) {
                const newPatientDetail = patientDetailRepo.create(Object.assign(Object.assign({}, patient_detail), { patient_id: existingPatient.id }));
                yield patientDetailRepo.save(newPatientDetail);
            }
            if (value_belief === null || value_belief === void 0 ? void 0 : value_belief.value_belief) {
                const newVB = valueBeliefRepo.create({
                    patient_id: existingPatient.id,
                    value_belief: value_belief.value_belief,
                });
                yield valueBeliefRepo.save(newVB);
            }
            if (privacy_request === null || privacy_request === void 0 ? void 0 : privacy_request.privacy_request) {
                const newPR = privacyRequestRepo.create({
                    patient_id: existingPatient.id,
                    privacy_request: privacy_request.privacy_request,
                });
                yield privacyRequestRepo.save(newPR);
            }
            if (Array.isArray(family_members)) {
                for (const fm of family_members) {
                    if (fm.name) {
                        const newFM = healthInfoRepo.create({
                            patient_id: existingPatient.id,
                            name: fm.name,
                            family_relationship: fm.family_relationship,
                            phone_number: fm.phone_number,
                        });
                        yield healthInfoRepo.save(newFM);
                    }
                }
            }
            return savedPatient;
        });
    }
    static createAdmissionOutPatient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { simulation_id, visit, referral, sep, document } = data;
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id: simulation_id });
                const patient_id = patient.id;
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
                const datas = { visitData, referralData, sepData, documentData };
                return datas;
            }
            catch (error) {
                return error;
            }
        });
    }
    static createAdmissionInpatient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { simulation_id, inpatientRecord, responsiblePerson, healthInformation, valueBelief, privacyRequest, documentPatient, } = data;
            const inpatientRecordRepo = data_source_1.AppDataSource.getRepository(InpatientRecord_entity_1.InpatientRecord);
            const responsiblePersonRepo = data_source_1.AppDataSource.getRepository(ResponsiblePerson_entity_1.ResponsiblePerson);
            const healthInfoRepo = data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient);
            const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
            const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
            const documentPatientRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
            try {
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id: simulation_id });
                const patient_id = patient.id;
                const newInpatientRecord = inpatientRecordRepo.create(Object.assign({ patient_id }, inpatientRecord));
                yield inpatientRecordRepo.save(newInpatientRecord);
                const newResponsiblePerson = responsiblePersonRepo.create(Object.assign({ patient_id }, responsiblePerson));
                yield responsiblePersonRepo.save(newResponsiblePerson);
                let newHealthInfo = null;
                if (healthInformation) {
                    newHealthInfo = healthInfoRepo.create(Object.assign({ patient_id }, healthInformation));
                    yield healthInfoRepo.save(newHealthInfo);
                }
                let newValueBelief = null;
                if (valueBelief) {
                    newValueBelief = valueBeliefRepo.create(Object.assign({ patient_id }, valueBelief));
                    yield valueBeliefRepo.save(newValueBelief);
                }
                let newPrivacyRequest = null;
                if (privacyRequest) {
                    newPrivacyRequest = privacyRequestRepo.create(Object.assign({ patient_id }, privacyRequest));
                    yield privacyRequestRepo.save(newPrivacyRequest);
                }
                let newDocumentPatient = null;
                if (documentPatient) {
                    newDocumentPatient = documentPatientRepo.create(Object.assign({ simulation_id }, documentPatient));
                    yield documentPatientRepo.save(newDocumentPatient);
                }
                return {
                    inpatientRecord: newInpatientRecord,
                    responsiblePerson: newResponsiblePerson,
                    healthInformation: newHealthInfo,
                    valueBelief: newValueBelief,
                    privacyRequest: newPrivacyRequest,
                    documentPatient: newDocumentPatient,
                };
            }
            catch (error) {
                throw new Error(`Failed to create admission inpatient: ${error.message}`);
            }
        });
    }
    static createAdmissionIGDPatient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { simulation_id, visitIGD, document } = data;
                const patientVisitIGDRepo = data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD);
                const documentPatientRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
                console.log("simulation_id:", simulation_id);
                console.log("visitIGD:", visitIGD);
                const visitIGDRecord = patientVisitIGDRepo.create(Object.assign({ simulation_id: simulation_id }, visitIGD));
                const documentPatientRecord = documentPatientRepo.create(Object.assign({ simulation_id: simulation_id }, document));
                yield patientVisitIGDRepo.save(visitIGDRecord);
                yield documentPatientRepo.save(documentPatientRecord);
                return {
                    visitIGDRecord,
                    documentPatientRecord,
                };
            }
            catch (error) {
                throw new Error(`Failed to create IGD admission: ${error.message}`);
            }
        });
    }
    static getPatient(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
            const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
            const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
            const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
            const healthInfoRepo = data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient);
            const patient = yield patientRepo.findOneBy({ simulation_id });
            if (!patient) {
                throw new Error("Patient not found");
            }
            const patient_detail = yield patientDetailRepo.findOneBy({ patient_id: patient.id });
            const value_belief = yield valueBeliefRepo.findOneBy({ patient_id: patient.id });
            const privacy_request = yield privacyRequestRepo.findOneBy({ patient_id: patient.id });
            const health_information_patients = yield healthInfoRepo.findBy({ patient_id: patient.id });
            return {
                data: patient,
                patient_detail: patient_detail !== null && patient_detail !== void 0 ? patient_detail : null,
                value_belief: value_belief !== null && value_belief !== void 0 ? value_belief : null,
                privacy_request: privacy_request !== null && privacy_request !== void 0 ? privacy_request : null,
                healthInfo: health_information_patients !== null && health_information_patients !== void 0 ? health_information_patients : null,
            };
        });
    }
    static getAdmissionOutPatient(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SimulationData = yield data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation).findOneOrFail({ where: { id: simulation_id } });
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id });
                const patient_detail = yield data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail).findOneByOrFail({ patient_id: patient.id });
                const visit = yield data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData).findOneBy({ patient_id: patient.id });
                const referral = yield data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData).findOneBy({ patient_id: patient.id });
                const sep = yield data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData).findOneBy({ patient_id: patient.id });
                const document = yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).findOneBy({ simulation_id });
                const data_kunjungan = Object.assign(Object.assign({}, visit), { cara_pembayaran: SimulationData.payment_method, nomer_asuransi: patient_detail.insurance_number });
                return {
                    data_kunjungan,
                    data_rujukan: referral,
                    data_sep: sep,
                    dokumen: document,
                };
            }
            catch (error) {
                throw new Error(`Failed to get admission data: ${error.message}`);
            }
        });
    }
    static getAdmissionInpatient(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const simulation_data = yield data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation).findOneOrFail({ where: { id: simulation_id } });
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id: simulation_id });
                const patient_detail = yield data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail).findOneByOrFail({ patient_id: patient.id });
                const inpatientRecord = yield data_source_1.AppDataSource.getRepository(InpatientRecord_entity_1.InpatientRecord).findOneByOrFail({ patient_id: patient.id });
                const responsiblePerson = yield data_source_1.AppDataSource.getRepository(ResponsiblePerson_entity_1.ResponsiblePerson).findOneByOrFail({ patient_id: patient.id });
                const health_information_patients = yield data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient).findBy({ patient_id: patient.id });
                const value_belief = yield data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief).findOneByOrFail({ patient_id: patient.id });
                const privacy_request = yield data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest).findOneBy({ patient_id: patient.id });
                const documentData = yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).findOneByOrFail({ simulation_id: simulation_id });
                const data_rawat_inap = Object.assign(Object.assign({}, inpatientRecord !== null && inpatientRecord !== void 0 ? inpatientRecord : null), { cara_pembayaran: (_a = simulation_data.payment_method) !== null && _a !== void 0 ? _a : null, nomer_asuransi: (_b = patient_detail.insurance_number) !== null && _b !== void 0 ? _b : null });
                return {
                    data_rawat_inap: data_rawat_inap !== null && data_rawat_inap !== void 0 ? data_rawat_inap : null,
                    penanggung_jawab: responsiblePerson !== null && responsiblePerson !== void 0 ? responsiblePerson : null,
                    penerima_informasi_kesehatan: health_information_patients !== null && health_information_patients !== void 0 ? health_information_patients : null,
                    nilai_dan_keyakinan: value_belief !== null && value_belief !== void 0 ? value_belief : null,
                    permintaan_privasi: privacy_request !== null && privacy_request !== void 0 ? privacy_request : null,
                    document: documentData !== null && documentData !== void 0 ? documentData : null
                };
            }
            catch (error) {
                throw new Error(`Failed to get admission data: ${error.message}`);
            }
        });
    }
    static getAdmissionIGD(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const simulation_data = yield data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation).findOneByOrFail({ id: simulation_id });
                const patientVisitIGD = yield data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD).findOneByOrFail({ simulation_id: simulation_id });
                const documentData = yield data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient).findOneByOrFail({ simulation_id: simulation_id });
                const data_kunjungan = Object.assign(Object.assign({}, patientVisitIGD !== null && patientVisitIGD !== void 0 ? patientVisitIGD : null), { cara_pembayaran: simulation_data.payment_method });
                return {
                    data_kunjungan,
                    document: documentData !== null && documentData !== void 0 ? documentData : null
                };
            }
            catch (error) {
                throw new Error(`Failed to get admission data: ${error.message}`);
            }
        });
    }
    static updatePatient(simulation_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patient, patient_detail, value_belief, privacy_request, family_members, } = data;
            const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
            const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
            const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
            const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
            const healthInfoRepo = data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient);
            const existingPatient = yield patientRepo.findOneBy({ simulation_id });
            if (!existingPatient) {
                throw new Error("Patient not found for update.");
            }
            // Update patient core data
            yield patientRepo.update({ simulation_id: simulation_id }, patient);
            // Update or create patient_detail
            if (patient_detail) {
                const existingDetail = yield patientDetailRepo.findOneBy({ patient_id: existingPatient.id });
                if (existingDetail) {
                    yield patientDetailRepo.update({ patient_id: existingPatient.id }, patient_detail);
                }
                else {
                    const newDetail = patientDetailRepo.create(Object.assign(Object.assign({}, patient_detail), { patient_id: existingPatient.id }));
                    yield patientDetailRepo.save(newDetail);
                }
            }
            // Update or create value_belief
            if (value_belief === null || value_belief === void 0 ? void 0 : value_belief.value_belief) {
                const existingVB = yield valueBeliefRepo.findOneBy({ patient_id: existingPatient.id });
                if (existingVB) {
                    yield valueBeliefRepo.update({ patient_id: existingPatient.id }, { value_belief: value_belief.value_belief });
                }
                else {
                    const newVB = valueBeliefRepo.create({
                        patient_id: existingPatient.id,
                        value_belief: value_belief.value_belief,
                    });
                    yield valueBeliefRepo.save(newVB);
                }
            }
            // Update or create privacy_request
            if (privacy_request === null || privacy_request === void 0 ? void 0 : privacy_request.privacy_request) {
                const existingPR = yield privacyRequestRepo.findOneBy({ patient_id: existingPatient.id });
                if (existingPR) {
                    yield privacyRequestRepo.update({ patient_id: existingPatient.id }, { privacy_request: privacy_request.privacy_request });
                }
                else {
                    const newPR = privacyRequestRepo.create({
                        patient_id: existingPatient.id,
                        privacy_request: privacy_request.privacy_request,
                    });
                    yield privacyRequestRepo.save(newPR);
                }
            }
            // Replace all family members (HealthInformationPatient)
            if (Array.isArray(family_members)) {
                yield healthInfoRepo.delete({ patient_id: existingPatient.id });
                for (const fm of family_members) {
                    if (fm.name) {
                        const newFM = healthInfoRepo.create({
                            patient_id: existingPatient.id,
                            name: fm.name,
                            family_relationship: fm.family_relationship,
                            phone_number: fm.phone_number,
                        });
                        yield healthInfoRepo.save(newFM);
                    }
                }
            }
            const updatedPatient = yield patientRepo.findOneBy({ simulation_id });
            const updatedDetail = yield patientDetailRepo.findOneBy({ patient_id: patient.id });
            const updatedValueBelief = yield valueBeliefRepo.findOneBy({ patient_id: patient.id });
            const updatedPrivacyRequest = yield privacyRequestRepo.findOneBy({ patient_id: patient.id });
            const updatedFamilyMembers = yield healthInfoRepo.find({
                where: { patient_id: patient.id },
                order: { id: "ASC" }
            });
            return {
                patient: updatedPatient,
                patient_detail: updatedDetail,
                value_belief: updatedValueBelief,
                privacy_request: updatedPrivacyRequest,
                family_members: updatedFamilyMembers,
            };
        });
    }
    static updateAdmissionOutPatient(simulation_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { visit, referral, sep, document } = data;
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id });
                const patient_id = patient.id;
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
                const referralRepo = data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData);
                const sepRepo = data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData);
                const documentRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
                yield visitRepo.update({ patient_id: patient_id }, visit);
                yield referralRepo.update({ patient_id: patient_id }, referral);
                yield sepRepo.update({ patient_id: patient_id }, sep);
                yield documentRepo.update({ simulation_id: simulation_id }, document);
                const updatedVisit = yield visitRepo.findOneBy({ patient_id });
                const updatedReferral = yield referralRepo.findOneBy({ patient_id });
                const updatedSEP = yield sepRepo.findOneBy({ patient_id });
                const updatedDocument = yield documentRepo.findOneBy({ simulation_id });
                return {
                    message: "Admission outpatient data updated successfully.",
                    visit: updatedVisit,
                    referral: updatedReferral,
                    sep: updatedSEP,
                    document: updatedDocument,
                };
            }
            catch (error) {
                return error;
            }
        });
    }
    static updateAdmissionInpatient(simulation_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { inpatientRecord, responsiblePerson, healthInformation, valueBelief, privacyRequest, documentPatient, } = data;
            const inpatientRecordRepo = data_source_1.AppDataSource.getRepository(InpatientRecord_entity_1.InpatientRecord);
            const responsiblePersonRepo = data_source_1.AppDataSource.getRepository(ResponsiblePerson_entity_1.ResponsiblePerson);
            const healthInfoRepo = data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient);
            const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
            const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
            const documentPatientRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
            try {
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id });
                const patient_id = patient.id;
                yield inpatientRecordRepo.update({ patient_id: patient_id }, inpatientRecord);
                yield responsiblePersonRepo.update({ patient_id: patient_id }, responsiblePerson);
                if (healthInformation) {
                    yield healthInfoRepo.update({ patient_id: patient_id }, healthInformation);
                }
                if (valueBelief) {
                    yield valueBeliefRepo.update({ patient_id: patient_id }, valueBelief);
                }
                if (privacyRequest) {
                    yield privacyRequestRepo.update({ patient_id: patient_id }, privacyRequest);
                }
                if (documentPatient) {
                    yield documentPatientRepo.update({ simulation_id: simulation_id }, documentPatient);
                }
                return {
                    message: "Admission inpatient data updated successfully.",
                    inpatientRecord: yield inpatientRecordRepo.findOneBy({ patient_id }),
                    responsiblePerson: yield responsiblePersonRepo.findOneBy({ patient_id }),
                    healthInformation: healthInformation ? yield healthInfoRepo.findOneBy({ patient_id }) : null,
                    valueBelief: valueBelief ? yield valueBeliefRepo.findOneBy({ patient_id }) : null,
                    privacyRequest: privacyRequest ? yield privacyRequestRepo.findOneBy({ patient_id }) : null,
                    documentPatient: documentPatient ? yield documentPatientRepo.findOneBy({ simulation_id }) : null,
                };
            }
            catch (error) {
                throw new Error(`Failed to update admission inpatient: ${error.message}`);
            }
        });
    }
    static updateAdmissionIGDPatient(simulation_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { visitIGD, document } = data;
            const patientVisitIGDRepo = data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD);
            const documentPatientRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
            try {
                yield patientVisitIGDRepo.update({ simulation_id: simulation_id }, visitIGD);
                yield documentPatientRepo.update({ simulation_id: simulation_id }, document);
                const updatedVisitIGD = yield patientVisitIGDRepo.findOneBy({ simulation_id });
                const updatedDocument = yield documentPatientRepo.findOneBy({ simulation_id });
                return {
                    message: "IGD admission data updated successfully.",
                    visitIGD: updatedVisitIGD,
                    document: updatedDocument,
                };
            }
            catch (error) {
                throw new Error(`Failed to update IGD admission: ${error.message}`);
            }
        });
    }
    static deletePatient(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patient = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
                yield patient.delete({ simulation_id: simulation_id });
                return { message: "Patient and related records deleted successfully." };
            }
            catch (error) {
                throw new Error(`Failed to delete patient data: ${error.message}`);
            }
        });
    }
    static deleteAdmissionOutpatient(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id: simulation_id });
                const visitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
                const referralRepo = data_source_1.AppDataSource.getRepository(PatientReferralData_entity_1.PatientReferralData);
                const sepRepo = data_source_1.AppDataSource.getRepository(SepData_entity_1.SepData);
                const documentRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
                yield visitRepo.delete({ patient_id: patient.id });
                yield referralRepo.delete({ patient_id: patient.id });
                yield sepRepo.delete({ patient_id: patient.id });
                yield documentRepo.delete({ simulation_id: simulation_id });
                return { message: "Admission Data is Succesfully deleted" };
            }
            catch (error) {
                throw new Error(`failed to delete admission data: ${error.message}`);
            }
        });
    }
    static deleteAdmissionInpatient(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patient = yield data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient).findOneByOrFail({ simulation_id: simulation_id });
                const inpatientRecordRepo = data_source_1.AppDataSource.getRepository(InpatientRecord_entity_1.InpatientRecord);
                const responsiblePersonRepo = data_source_1.AppDataSource.getRepository(ResponsiblePerson_entity_1.ResponsiblePerson);
                const healthInfoRepo = data_source_1.AppDataSource.getRepository(HealthInformationPatient_entity_1.HealthInformationPatient);
                const valueBeliefRepo = data_source_1.AppDataSource.getRepository(ValueBelief_entity_1.ValueBelief);
                const privacyRequestRepo = data_source_1.AppDataSource.getRepository(PrivacyRequest_entity_1.PrivacyRequest);
                const documentPatientRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
                yield inpatientRecordRepo.delete({ patient_id: patient.id });
                yield responsiblePersonRepo.delete({ patient_id: patient.id });
                yield healthInfoRepo.delete({ patient_id: patient.id });
                yield valueBeliefRepo.delete({ patient_id: patient.id });
                yield privacyRequestRepo.delete({ patient_id: patient.id });
                yield documentPatientRepo.delete({ simulation_id: simulation_id });
                return { message: "Admission Data is Succesfully deleted" };
            }
            catch (error) {
                throw new Error(`failed to delete admission data: ${error.message}`);
            }
        });
    }
    static deleteAdmissionIGD(simulation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientVisitIGDRepo = data_source_1.AppDataSource.getRepository(PatientVisitIGDData_entity_1.PatientVisitIGD);
                const documentPatientRepo = data_source_1.AppDataSource.getRepository(DocumentPatient_entity_1.DocumentPatient);
                yield patientVisitIGDRepo.delete({ simulation_id: simulation_id });
                yield documentPatientRepo.delete({ simulation_id: simulation_id });
                return { message: "Admission Data is Succesfully deleted" };
            }
            catch (error) {
                throw new Error(`failed to delete admission data: ${error.message}`);
            }
        });
    }
}
exports.ComponentService = ComponentService;
//# sourceMappingURL=ComponentService.js.map