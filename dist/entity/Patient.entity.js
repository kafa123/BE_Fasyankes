"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const typeorm_1 = require("typeorm");
const Simulation_entity_1 = require("./Simulation.entity");
const ValueBelief_entity_1 = require("./ValueBelief.entity");
const PrivacyRequest_entity_1 = require("./PrivacyRequest.entity");
const HealthInformationPatient_entity_1 = require("./HealthInformationPatient.entity");
const PatientDetail_entity_1 = require("./PatientDetail.entity");
const PatientVisitData_entity_1 = require("./PatientVisitData.entity");
const PatientReferralData_entity_1 = require("./PatientReferralData.entity");
const SepData_entity_1 = require("./SepData.entity");
const InpatientRecord_entity_1 = require("./InpatientRecord.entity");
const ResponsiblePerson_entity_1 = require("./ResponsiblePerson.entity");
let Patient = class Patient {
};
exports.Patient = Patient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Patient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Patient.prototype, "simulation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "nik", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["L", "P"],
        enumName: "patients_gender_enum",
        nullable: false,
    }),
    __metadata("design:type", String)
], Patient.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], Patient.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "place_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Patient.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Patient.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Patient.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Simulation_entity_1.Simulation, (simulation) => simulation.patient, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "simulation_id" }),
    __metadata("design:type", Simulation_entity_1.Simulation)
], Patient.prototype, "simulation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ValueBelief_entity_1.ValueBelief, (valueBelief) => valueBelief.patient),
    __metadata("design:type", ValueBelief_entity_1.ValueBelief)
], Patient.prototype, "valueBelief", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PrivacyRequest_entity_1.PrivacyRequest, (privacyRequest) => privacyRequest.patient),
    __metadata("design:type", PrivacyRequest_entity_1.PrivacyRequest)
], Patient.prototype, "privacyRequest", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => HealthInformationPatient_entity_1.HealthInformationPatient, (healthInformationPatient) => healthInformationPatient.patient),
    __metadata("design:type", HealthInformationPatient_entity_1.HealthInformationPatient)
], Patient.prototype, "healthInformationPatient", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PatientDetail_entity_1.PatientDetail, (patientDetail) => patientDetail.patient),
    __metadata("design:type", PatientDetail_entity_1.PatientDetail)
], Patient.prototype, "patientDetail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PatientVisitData_entity_1.PatientVisitData, (patientVisitData) => patientVisitData.patient),
    __metadata("design:type", PatientVisitData_entity_1.PatientVisitData)
], Patient.prototype, "patientVisitData", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PatientReferralData_entity_1.PatientReferralData, (patientReferralData) => patientReferralData.patient),
    __metadata("design:type", PatientReferralData_entity_1.PatientReferralData)
], Patient.prototype, "patientReferralData", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => SepData_entity_1.SepData, (sepData) => sepData.patient),
    __metadata("design:type", SepData_entity_1.SepData)
], Patient.prototype, "sepData", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => InpatientRecord_entity_1.InpatientRecord, (record) => record.patient),
    __metadata("design:type", Array)
], Patient.prototype, "inpatientRecords", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ResponsiblePerson_entity_1.ResponsiblePerson, (rp) => rp.patient),
    __metadata("design:type", ResponsiblePerson_entity_1.ResponsiblePerson)
], Patient.prototype, "responsiblePerson", void 0);
exports.Patient = Patient = __decorate([
    (0, typeorm_1.Entity)({ name: "patients" }),
    (0, typeorm_1.Unique)(["simulation_id"])
], Patient);
//# sourceMappingURL=Patient.entity.js.map