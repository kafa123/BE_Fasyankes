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
exports.SepData = void 0;
const typeorm_1 = require("typeorm");
const Patient_entity_1 = require("./Patient.entity");
let SepData = class SepData {
};
exports.SepData = SepData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], SepData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], SepData.prototype, "patient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SepData.prototype, "sep_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SepData.prototype, "reason_for_visit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SepData.prototype, "procedure", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SepData.prototype, "assesment", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SepData.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SepData.prototype, "accident", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SepData.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SepData.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Patient_entity_1.Patient, (patient) => patient.sepData, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "patient_id" }),
    __metadata("design:type", Patient_entity_1.Patient)
], SepData.prototype, "patient", void 0);
exports.SepData = SepData = __decorate([
    (0, typeorm_1.Entity)({ name: "sep_datas" })
], SepData);
//# sourceMappingURL=SepData.entity.js.map