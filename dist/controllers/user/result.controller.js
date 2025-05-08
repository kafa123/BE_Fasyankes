"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResultController = void 0;
const data_source_1 = require("../../data-source");
const PersonalCase_entity_1 = require("../../entity/PersonalCase.entity");
const Simulation_entity_1 = require("../../entity/Simulation.entity");
class UserResultController {
    static getResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const personalCaseRepo = data_source_1.AppDataSource.getRepository(PersonalCase_entity_1.PersonalCase);
                const simulationRepo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                const userId = (_a = req["currentUser"]) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(400).json({ error: "User ID is required" });
                    return;
                }
                const simulationTotal = yield simulationRepo.count();
                const doneSimulation = yield personalCaseRepo.count({
                    where: {
                        id: userId, // pastikan `userId` adalah variabel id user kamu
                        checklist: true
                    }
                });
                const countCases = (_a) => __awaiter(this, [_a], void 0, function* ({ userId, checklist, type }) {
                    return yield personalCaseRepo.count({
                        where: Object.assign(Object.assign({ id: userId }, (checklist !== undefined && { checklist })), { simulation: {
                                category: type
                            } }),
                        relations: {
                            simulation: true
                        }
                    });
                });
                const tppriCount = yield countCases({ userId, type: "rawat_inap" });
                const tppriDone = yield countCases({ userId, checklist: true, type: "rawat_inap" });
                const tpprjCount = yield countCases({ userId, type: "rawat_jalan" });
                const tpprjDone = yield countCases({ userId, checklist: true, type: "rawat_jalan" });
                const tppgdCount = yield countCases({ userId, type: "gawat_darurat" });
                const tppgdDone = yield countCases({ userId, checklist: true, type: "gawat_darurat" });
                res.status(200).json({ data: {
                        totalSimulation: simulationTotal,
                        doneSimulation: doneSimulation,
                        tppriCount: tppriCount,
                        ttpriDone: tppriDone,
                        tpprjCount: tpprjCount,
                        ttprjDone: tpprjDone,
                        tppgdCount: tppgdCount,
                        ttpgdDone: tppgdDone,
                    } });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.UserResultController = UserResultController;
//# sourceMappingURL=result.controller.js.map