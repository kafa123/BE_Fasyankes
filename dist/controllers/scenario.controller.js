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
exports.ScenarioUserController = void 0;
const data_source_1 = require("../data-source");
const Scenario_entity_1 = require("../entity/Scenario.entity");
class ScenarioUserController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const simulations = yield repo.find();
                res.status(200).json({ data: simulations });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const simulation = yield repo.findOneBy({ id: parseInt(req.params.id) });
                if (!simulation)
                    res.status(404).json({ error: "Simulation not found" });
                res.status(200).json({ data: simulation });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.ScenarioUserController = ScenarioUserController;
//# sourceMappingURL=scenario.controller.js.map