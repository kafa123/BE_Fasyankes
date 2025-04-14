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
exports.ValueBelief = void 0;
const typeorm_1 = require("typeorm");
const Patient_entity_1 = require("./Patient.entity");
let ValueBelief = class ValueBelief {
};
exports.ValueBelief = ValueBelief;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], ValueBelief.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], ValueBelief.prototype, "patient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ValueBelief.prototype, "value_belief", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Patient_entity_1.Patient, (patient) => patient.valueBelief, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "patient_id" }),
    __metadata("design:type", Patient_entity_1.Patient)
], ValueBelief.prototype, "patient", void 0);
exports.ValueBelief = ValueBelief = __decorate([
    (0, typeorm_1.Entity)({ name: "value_beliefs" })
], ValueBelief);
//# sourceMappingURL=ValueBelief.entity.js.map