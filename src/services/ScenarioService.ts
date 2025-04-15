// services/scenarioService.ts
import { AppDataSource } from "../data-source";
import { Scenario } from "../entity/Scenario.entity";
import { Answer } from "../entity/Answer.entity";
import { CreateScenarioWithAnswerDto } from "../dto/CreateScenarioWithAnswer.dto";

export const createScenarioWithAnswer = async (dto: CreateScenarioWithAnswerDto) => {
  const scenarioRepo = AppDataSource.getRepository(Scenario);
  const answerRepo = AppDataSource.getRepository(Answer);

  const scenario = scenarioRepo.create({
    simulation_id: dto.simulation_id,
    scenario: dto.scenario,
    question: dto.question,
    component: dto.component,
  });

  const savedScenario = await scenarioRepo.save(scenario);

  const answer = answerRepo.create({
    scenario_id: savedScenario.id,
    answer_text: dto.answer_text,
    answer_image: dto.answer_image,
  });

  const savedAnswer = await answerRepo.save(answer);

  return {
    scenario: savedScenario,
    answer: savedAnswer,
  };
};
