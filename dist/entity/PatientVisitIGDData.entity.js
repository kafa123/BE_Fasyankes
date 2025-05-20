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
exports.PatientVisitIGD = exports.EntryMethod = exports.ProcedureCase = void 0;
const typeorm_1 = require("typeorm");
const Simulation_entity_1 = require("./Simulation.entity");
var ProcedureCase;
(function (ProcedureCase) {
    ProcedureCase["Bedah"] = "Bedah";
    ProcedureCase["NonBedah"] = "Non Bedah";
})(ProcedureCase || (exports.ProcedureCase = ProcedureCase = {}));
var EntryMethod;
(function (EntryMethod) {
    EntryMethod["Sendiri"] = "sendiri";
    EntryMethod["Diantar"] = "diantar";
})(EntryMethod || (exports.EntryMethod = EntryMethod = {}));
let PatientVisitIGD = class PatientVisitIGD {
};
exports.PatientVisitIGD = PatientVisitIGD;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PatientVisitIGD.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PatientVisitIGD.prototype, "simulation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], PatientVisitIGD.prototype, "admission_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], PatientVisitIGD.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ProcedureCase,
    }),
    __metadata("design:type", String)
], PatientVisitIGD.prototype, "procedure_case", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], PatientVisitIGD.prototype, "is_accident", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EntryMethod,
    }),
    __metadata("design:type", String)
], PatientVisitIGD.prototype, "entry_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], PatientVisitIGD.prototype, "insurance_number", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], PatientVisitIGD.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], PatientVisitIGD.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Simulation_entity_1.Simulation, (simulation) => simulation.patientVisitIGD, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "simulation_id" }),
    __metadata("design:type", Simulation_entity_1.Simulation)
], PatientVisitIGD.prototype, "simulation", void 0);
exports.PatientVisitIGD = PatientVisitIGD = __decorate([
    (0, typeorm_1.Entity)("patient_visit_IGD_datas")
], PatientVisitIGD);
//# sourceMappingURL=PatientVisitIGDData.entity.js.map