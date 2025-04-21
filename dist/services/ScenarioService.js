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
exports.createScenarioWithAnswer = void 0;
// services/scenarioService.ts
const data_source_1 = require("../data-source");
const Scenario_entity_1 = require("../entity/Scenario.entity");
const Answer_entity_1 = require("../entity/Answer.entity");
const createScenarioWithAnswer = (dto) => __awaiter(void 0, void 0, void 0, function* () {
    const scenarioRepo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
    const answerRepo = data_source_1.AppDataSource.getRepository(Answer_entity_1.Answer);
    const scenario = scenarioRepo.create({
        simulation_id: dto.simulation_id,
        scenario: dto.scenario,
        question: dto.question,
        component: dto.component,
    });
    const savedScenario = yield scenarioRepo.save(scenario);
    const answer = answerRepo.create({
        scenario_id: savedScenario.id,
        answer_text: dto.answer_text,
        answer_image: dto.answer_image,
    });
    const savedAnswer = yield answerRepo.save(answer);
    return {
        scenario: savedScenario,
        answer: savedAnswer,
    };
});
exports.createScenarioWithAnswer = createScenarioWithAnswer;
//# sourceMappingURL=ScenarioService.js.map