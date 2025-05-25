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
const Simulation_entity_1 = require("../entity/Simulation.entity");
const ComponentService_1 = require("../services/ComponentService");
const Answer_entity_1 = require("../entity/Answer.entity");
class ScenarioUserController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const simulationId = parseInt(req.params.id);
                if (isNaN(simulationId)) {
                    res.status(400).json({ error: "Invalid simulation ID" });
                    return;
                }
                const scenarios = yield repo.find({ where: { simulation_id: simulationId } });
                if (scenarios.length === 0) {
                    res.status(200).json({ message: "No scenarios found for this simulation" });
                    return;
                }
                res.status(200).json({ data: scenarios });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = parseInt(req.params.id);
                const scenarioRepo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const answerRepo = data_source_1.AppDataSource.getRepository(Answer_entity_1.Answer);
                const scenario = yield scenarioRepo.findOneBy({ order });
                if (!scenario) {
                    res.status(404).json({ error: "Scenario not found" });
                    return;
                }
                const simulation = yield data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation).findOneByOrFail({
                    id: scenario.simulation_id
                });
                const answer = yield answerRepo.findOneBy({
                    scenario_id: scenario.id
                });
                let component = null;
                switch (scenario.component) {
                    case "pendaftaran":
                        component = yield ComponentService_1.ComponentService.getPatient(simulation.id);
                        break;
                    case "admission-rawat-jalan":
                        component = yield ComponentService_1.ComponentService.getAdmissionOutPatient(simulation.id);
                        break;
                    case "admission-rawat-inap":
                        component = yield ComponentService_1.ComponentService.getAdmissionInpatient(simulation.id);
                        break;
                    case "admission-gawat-darurat":
                        component = yield ComponentService_1.ComponentService.getAdmissionIGD(simulation.id);
                        break;
                }
                res.status(200).json({
                    data: scenario,
                    answer: answer,
                    component: component
                });
            }
            catch (e) {
                res.status(500).json({ message: "error", error: e.message });
            }
        });
    }
}
exports.ScenarioUserController = ScenarioUserController;
//# sourceMappingURL=scenario.controller.js.map