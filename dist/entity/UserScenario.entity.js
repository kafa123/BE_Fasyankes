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
exports.UserScenario = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./User.entity");
const Scenario_entity_1 = require("./Scenario.entity");
let UserScenario = class UserScenario {
};
exports.UserScenario = UserScenario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], UserScenario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], UserScenario.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], UserScenario.prototype, "scenario_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], UserScenario.prototype, "score_similarity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserScenario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserScenario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.userScenario, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_entity_1.User)
], UserScenario.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Scenario_entity_1.Scenario, (scenario) => scenario.userScenario, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "scenario_id" }),
    __metadata("design:type", Scenario_entity_1.Scenario)
], UserScenario.prototype, "scenario", void 0);
exports.UserScenario = UserScenario = __decorate([
    (0, typeorm_1.Entity)({ name: "user_scenarios" })
], UserScenario);
//# sourceMappingURL=UserScenario.entity.js.map