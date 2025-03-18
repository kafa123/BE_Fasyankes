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
exports.UserCount = void 0;
const typeorm_1 = require("typeorm");
let UserCount = class UserCount {
};
exports.UserCount = UserCount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], UserCount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], UserCount.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], UserCount.prototype, "login_date", void 0);
exports.UserCount = UserCount = __decorate([
    (0, typeorm_1.Entity)({ name: "user_counts" })
], UserCount);
//# sourceMappingURL=UserCount.entity.js.map