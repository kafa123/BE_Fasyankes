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
exports.Scenario = void 0;
const typeorm_1 = require("typeorm");
const Simulation_entity_1 = require("./Simulation.entity");
const Answer_entity_1 = require("./Answer.entity");
let Scenario = class Scenario {
};
exports.Scenario = Scenario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Scenario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Scenario.prototype, "simulation_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Scenario.prototype, "scenario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Scenario.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["Pendaftaran", "Data Kunjungan", "Data Rujukan", "Data SEP"],
        enumName: "scenarios_componen_enum",
        nullable: false,
    }),
    __metadata("design:type", String)
], Scenario.prototype, "componen", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Simulation_entity_1.Simulation, (simulation) => simulation.scenario, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "simulation_id" }),
    __metadata("design:type", Simulation_entity_1.Simulation)
], Scenario.prototype, "simulation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Answer_entity_1.Answer, (answer) => answer.scenario),
    __metadata("design:type", Answer_entity_1.Answer)
], Scenario.prototype, "answer", void 0);
exports.Scenario = Scenario = __decorate([
    (0, typeorm_1.Entity)({ name: "scenarios" })
], Scenario);
//# sourceMappingURL=Scenario.entity.js.map