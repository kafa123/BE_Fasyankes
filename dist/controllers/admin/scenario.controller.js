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
exports.ScenarioController = void 0;
const data_source_1 = require("../../data-source");
const Scenario_entity_1 = require("../../entity/Scenario.entity");
const Answer_entity_1 = require("../../entity/Answer.entity");
class ScenarioController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { simulation_id, scenario, question, component, answer_text, order } = req.body;
                if (!scenario || !question || !component || !order) {
                    res.status(400).json({ error: "Required fields are missing" });
                    return;
                }
                const scenarioRepo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const answerRepo = data_source_1.AppDataSource.getRepository(Answer_entity_1.Answer);
                yield scenarioRepo
                    .createQueryBuilder()
                    .update(Scenario_entity_1.Scenario)
                    .set({ order: () => `"order" + 1` })
                    .where("simulation_id = :simulation_id AND \"order\" >= :order", { simulation_id, order })
                    .execute();
                const newScenario = scenarioRepo.create({
                    simulation_id,
                    scenario,
                    question,
                    component,
                    order
                });
                const savedScenario = yield scenarioRepo.save(newScenario);
                const answerImagePath = req.file ? `/uploads/${req.file.filename}` : null;
                const newAnswer = answerRepo.create({
                    scenario_id: savedScenario.id,
                    answer_text,
                    answer_image: answerImagePath,
                });
                const savedAnswer = yield answerRepo.save(newAnswer);
                res.status(201).json({
                    message: "Scenario and answer created successfully",
                    scenario: savedScenario,
                    answer: savedAnswer
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error", message: error });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                let scenario = yield repo.findOneBy({ id: parseInt(req.params.id) });
                if (!scenario)
                    res.status(404).json({ error: "Scenario not found" });
                repo.merge(scenario, req.body);
                yield repo.save(scenario);
                res.status(200).json({ message: "Scenario updated successfully", scenario });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const result = yield repo.delete(req.params.id);
                if (result.affected === 0)
                    res.status(404).json({ error: "SCenario not found" });
                res.status(200).json({ message: "Scenario deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.ScenarioController = ScenarioController;
//# sourceMappingURL=scenario.controller.js.map