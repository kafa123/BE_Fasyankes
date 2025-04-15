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
exports.PatientVisitData = void 0;
const typeorm_1 = require("typeorm");
const Patient_entity_1 = require("./Patient.entity");
let PatientVisitData = class PatientVisitData {
};
exports.PatientVisitData = PatientVisitData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], PatientVisitData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], PatientVisitData.prototype, "patient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], PatientVisitData.prototype, "admision_time", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: [
            "Poliklinik Mata",
            "Poliklinik Jantung",
            "Poliklinik Dalam",
            "Poliklinik Saraf"
        ],
        enumName: "patient_visit_datas_clinic_enum",
        nullable: false,
    }),
    __metadata("design:type", String)
], PatientVisitData.prototype, "clinic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PatientVisitData.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PatientVisitData.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PatientVisitData.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Patient_entity_1.Patient, (patient) => patient.patientVisitData, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "patient_id" }),
    __metadata("design:type", Patient_entity_1.Patient)
], PatientVisitData.prototype, "patient", void 0);
exports.PatientVisitData = PatientVisitData = __decorate([
    (0, typeorm_1.Entity)({ name: "patient_visit_datas" })
], PatientVisitData);
//# sourceMappingURL=PatientVisitData.entity.js.map