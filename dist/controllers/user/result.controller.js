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
const Scenario_entity_1 = require("../../entity/Scenario.entity");
const UserScenario_entity_1 = require("../../entity/UserScenario.entity");
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
    static postSimilarity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const scenarioRepo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const personalCaseRepo = data_source_1.AppDataSource.getRepository(PersonalCase_entity_1.PersonalCase);
                const userScenarioRepo = data_source_1.AppDataSource.getRepository(UserScenario_entity_1.UserScenario);
                const userId = (_a = req["currentUser"]) === null || _a === void 0 ? void 0 : _a.id;
                const simulationId = req.params.simulationId;
                const scenarioId = req.params.scenarioId;
                const { answer } = req.body;
                if (!answer) {
                    res.status(400).json({ error: "Answer is required" });
                    return;
                }
                const scenario = yield scenarioRepo.findOne({
                    where: {
                        id: Number(scenarioId),
                    },
                    select: ['question'],
                });
                const keyAnswer = scenario.question;
                if (!keyAnswer) {
                    res.status(404).json({ error: "Scenario not found" });
                    return;
                }
                let totalCorrectWord = 0;
                const cleanKeyAnswer = keyAnswer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
                const arrayKeyAnswer = cleanKeyAnswer.split(" ").filter(kata => kata !== "");
                const totalWordKeyAnswer = arrayKeyAnswer.length;
                const gradePerWord = 100 / totalWordKeyAnswer;
                const cleanUserAnswer = answer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "");
                const arrayUserAnswer = cleanUserAnswer.split(" ").filter(kata => kata !== "");
                for (let i = 0; i < arrayKeyAnswer.length; i++) {
                    for (let j = 0; j < arrayUserAnswer.length; j++) {
                        if (arrayKeyAnswer[i] === arrayUserAnswer[j]) {
                            totalCorrectWord++;
                            break;
                        }
                    }
                }
                ;
                const totalScore = Number((totalCorrectWord * gradePerWord).toFixed(2));
                const personalCase = yield personalCaseRepo.findOne({
                    where: {
                        id: userId,
                        simulation_id: Number(simulationId),
                    },
                });
                console.log("personalCase", personalCase);
                if (personalCase.checklist === true) {
                    const userScenarioNew = userScenarioRepo.create({
                        user_id: userId,
                        scenario_id: Number(scenarioId),
                        score_similarity: totalScore
                    });
                    yield userScenarioRepo.save(userScenarioNew);
                }
                else {
                    const latestRecord = yield userScenarioRepo.findOne({
                        where: {
                            user_id: userId,
                            scenario_id: Number(scenarioId),
                        },
                        order: {
                            createdAt: "DESC"
                        }
                    });
                    if (latestRecord) {
                        latestRecord.score_similarity = totalScore;
                        yield userScenarioRepo.save(latestRecord);
                    }
                    else {
                        const userScenarioNew = userScenarioRepo.create({
                            user_id: userId,
                            scenario_id: Number(scenarioId),
                            score_similarity: totalScore
                        });
                        yield userScenarioRepo.save(userScenarioNew);
                    }
                }
                ;
                res.status(200).json({ data: {
                        message: "Success",
                        totalScore: totalScore,
                    } });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getSimulationResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const scenarioRepo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
                const personalCaseRepo = data_source_1.AppDataSource.getRepository(PersonalCase_entity_1.PersonalCase);
                const userScenarioRepo = data_source_1.AppDataSource.getRepository(UserScenario_entity_1.UserScenario);
                const userId = (_a = req["currentUser"]) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield personalCaseRepo
                    .createQueryBuilder("pc")
                    .innerJoin("pc.simulation", "sm")
                    .innerJoin("scenarios", "s", "s.simulation_id = pc.simulation_id")
                    .innerJoin(qb => qb
                    .select("us.user_id", "user_id")
                    .addSelect("us.scenario_id", "scenario_id")
                    .addSelect("AVG(us.score_similarity)", "avg_score")
                    .from(UserScenario_entity_1.UserScenario, "us")
                    .where("us.user_id = :userId", { userId })
                    .groupBy("us.user_id, us.scenario_id"), "aps", "aps.scenario_id = s.id AND aps.user_id = pc.user_id")
                    .where("pc.user_id = :userId", { userId })
                    .andWhere("pc.checklist = true")
                    .select("pc.simulation_id", "simulation_id")
                    .addSelect("sm.case_description", "case_description")
                    .addSelect("pc.duration", "duration")
                    .addSelect("AVG(aps.avg_score)", "average_score")
                    .groupBy("pc.simulation_id, sm.case_description, pc.duration")
                    .orderBy("pc.simulation_id")
                    .getRawMany();
                if (result.length === 0) {
                    res.status(404).json({ error: "No results found" });
                    return;
                }
                ;
                res.status(200).json({ data: {
                        result: result.map((item) => ({
                            simulation_id: item.simulation_id,
                            duration: item.duration,
                            case_description: item.case_description,
                            average_score: Number(item.average_score).toFixed(2),
                        })),
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