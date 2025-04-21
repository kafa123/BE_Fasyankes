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
exports.Simulation = void 0;
const typeorm_1 = require("typeorm");
const PersonalCase_entity_1 = require("./PersonalCase.entity");
const Scenario_entity_1 = require("./Scenario.entity");
const Patient_entity_1 = require("./Patient.entity");
let Simulation = class Simulation {
};
exports.Simulation = Simulation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Simulation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["pasien_lama", "pasien_baru"],
        enumName: "simulations_patient_type_enum",
        nullable: false,
    }),
    __metadata("design:type", String)
], Simulation.prototype, "patient_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["rawat_jalan", "rawat_inap", "gawat_darurat"],
        enumName: "simulations_category_enum",
        nullable: false,
    }),
    __metadata("design:type", String)
], Simulation.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Simulation.prototype, "perujuk", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Simulation.prototype, "diagnose", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Simulation.prototype, "case_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Simulation.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Simulation.prototype, "case_description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Simulation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Simulation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PersonalCase_entity_1.PersonalCase, (personalCase) => personalCase.simulation),
    __metadata("design:type", Array)
], Simulation.prototype, "personalCases", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Scenario_entity_1.Scenario, (scenario) => scenario.simulation),
    __metadata("design:type", Scenario_entity_1.Scenario)
], Simulation.prototype, "scenario", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Patient_entity_1.Patient, (patient) => patient.simulation),
    __metadata("design:type", Patient_entity_1.Patient)
], Simulation.prototype, "patient", void 0);
exports.Simulation = Simulation = __decorate([
    (0, typeorm_1.Entity)({ name: "simulations" })
], Simulation);
//# sourceMappingURL=Simulation.entity.js.map