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
exports.PersonalCase = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Simulation_entity_1 = require("./Simulation.entity");
let PersonalCase = class PersonalCase {
};
exports.PersonalCase = PersonalCase;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], PersonalCase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.personalCases, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_entity_1.User)
], PersonalCase.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Simulation_entity_1.Simulation, (simulation) => simulation.personalCases, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "simulation_id" }),
    __metadata("design:type", Simulation_entity_1.Simulation)
], PersonalCase.prototype, "simulation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PersonalCase.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PersonalCase.prototype, "updatedAt", void 0);
exports.PersonalCase = PersonalCase = __decorate([
    (0, typeorm_1.Entity)({ name: "personal_cases" })
], PersonalCase);
//# sourceMappingURL=PersonalCase.entity.js.map