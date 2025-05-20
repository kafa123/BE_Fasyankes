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
exports.DocumentPatient = void 0;
const typeorm_1 = require("typeorm");
const Simulation_entity_1 = require("./Simulation.entity");
let DocumentPatient = class DocumentPatient {
};
exports.DocumentPatient = DocumentPatient;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentPatient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DocumentPatient.prototype, "simulation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_patient_card", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_polyclinic_form", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_small_label", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_big_label", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_tracer_RM_document", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_proof_of_service", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_SEP", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_queue_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_patient__bracelet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_general_consent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool", default: false }),
    __metadata("design:type", Boolean)
], DocumentPatient.prototype, "has_control_card", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "createdAt" }),
    __metadata("design:type", Date)
], DocumentPatient.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updatedAt" }),
    __metadata("design:type", Date)
], DocumentPatient.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Simulation_entity_1.Simulation, (simulation) => simulation.documentPatient, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "simulation_id" }),
    __metadata("design:type", Simulation_entity_1.Simulation)
], DocumentPatient.prototype, "simulation", void 0);
exports.DocumentPatient = DocumentPatient = __decorate([
    (0, typeorm_1.Entity)("document_patients")
], DocumentPatient);
//# sourceMappingURL=DocumentPatient.entity.js.map