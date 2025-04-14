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
exports.PatientDetail = void 0;
const typeorm_1 = require("typeorm");
const Patient_entity_1 = require("./Patient.entity");
let PatientDetail = class PatientDetail {
};
exports.PatientDetail = PatientDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], PatientDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], PatientDetail.prototype, "patient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PatientDetail.prototype, "type_of_insurance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: [
            "tidak sekolah",
            "SD",
            "SLTP sederajat",
            "SLTA sederajat",
            "D1-D3",
            "D4",
            "S1",
            "S2",
            "S3",
        ],
        enumName: "patient_details_educational_level_enum",
        nullable: false,
    }),
    __metadata("design:type", String)
], PatientDetail.prototype, "educational_level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["A", "B", "AB", "O"],
        enumName: "patient_details_blood_type_enum",
        nullable: true,
    }),
    __metadata("design:type", String)
], PatientDetail.prototype, "blood_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: [
            "ISLAM",
            "KRISTEN",
            "KATHOLIK",
            "HINDU",
            "BUDHA",
            "KHONGHUCU",
            "PENGHAYAT",
            "LAIN-LAIN",
        ],
        enumName: "patient_details_religion_enum",
        nullable: true,
    }),
    __metadata("design:type", String)
], PatientDetail.prototype, "religion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["BELUM KAWIN", "KAWIN", "CERAI HIDUP", "CERAI MATI"],
        enumName: "patient_details_marriage_status_enum",
        nullable: false,
    }),
    __metadata("design:type", String)
], PatientDetail.prototype, "marriage_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientDetail.prototype, "profession", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientDetail.prototype, "ethnic", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientDetail.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientDetail.prototype, "disability", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientDetail.prototype, "insurance_number", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Patient_entity_1.Patient, (patient) => patient.patientDetail, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "patient_id" }),
    __metadata("design:type", Patient_entity_1.Patient)
], PatientDetail.prototype, "patient", void 0);
exports.PatientDetail = PatientDetail = __decorate([
    (0, typeorm_1.Entity)({ name: "patient_details" })
], PatientDetail);
//# sourceMappingURL=PatientDetail.entity.js.map