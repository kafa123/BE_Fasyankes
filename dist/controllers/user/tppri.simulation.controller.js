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
exports.UserTPPRISimulationController = void 0;
const data_source_1 = require("../../data-source");
const Simulation_entity_1 = require("../../entity/Simulation.entity");
const PersonalCase_entity_1 = require("../../entity/PersonalCase.entity");
class UserTPPRISimulationController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req["currentUser"]) === null || _a === void 0 ? void 0 : _a.id;
                const simulationsRepo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                if (!userId) {
                    const simulations = yield simulationsRepo.find({
                        where: {
                            category: "rawat_inap"
                        }
                    });
                    res.status(200).json({ data: simulations });
                    return;
                }
                const repo = data_source_1.AppDataSource.getRepository(PersonalCase_entity_1.PersonalCase);
                const personalCases = yield repo.find({
                    where: {
                        user_id: userId,
                        simulation: {
                            category: "rawat_inap"
                        }
                    },
                    relations: {
                        simulation: true
                    }
                });
                res.status(200).json({ data: personalCases });
            }
            catch (error) {
                console.error("Error fetching personal cases:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                const simulation = yield repo.findOneBy({ id: parseInt(req.params.id) });
                if (!simulation) {
                    res.status(404).json({ error: "Simulation not found" });
                    return;
                }
                res.status(200).json({ data: simulation });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.UserTPPRISimulationController = UserTPPRISimulationController;
//# sourceMappingURL=tppri.simulation.controller.js.map