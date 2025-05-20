import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { PersonalCase } from "../../entity/PersonalCase.entity";
import { Simulation } from "../../entity/Simulation.entity";
import { Scenario } from "../../entity/Scenario.entity";
import { UserScenario } from "../../entity/UserScenario.entity";

export class UserResultController {

  static async getResult(req: Request, res: Response): Promise<void> {
    try {
        const personalCaseRepo = AppDataSource.getRepository(PersonalCase);
        const simulationRepo = AppDataSource.getRepository(Simulation);
        
        const userId = req["currentUser"]?.id;

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }

        const simulationTotal = await simulationRepo.count();

        const doneSimulation = await personalCaseRepo.count({
            where: {
              id: userId,      // pastikan `userId` adalah variabel id user kamu
              checklist: true
            }
          });
        
        const countCases = async ({ userId, checklist, type }: { userId: number, checklist?: boolean, type: string }) => {
            return await personalCaseRepo.count({
              where: {
                id: userId,
                ...(checklist !== undefined && { checklist }),
                simulation: {
                  category: type
                }
              },
              relations: {
                simulation: true
              }
            });
          };

          const tppriCount = await countCases({ userId, type:"rawat_inap"});
          const tppriDone = await countCases({ userId, checklist: true, type:"rawat_inap"});
          const tpprjCount = await countCases({ userId, type:"rawat_jalan"});
          const tpprjDone = await countCases({ userId, checklist: true, type:"rawat_jalan"});
          const tppgdCount = await countCases({ userId, type:"gawat_darurat"});
          const tppgdDone = await countCases({ userId, checklist: true, type:"gawat_darurat"});

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

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async postSimilarity(req: Request, res: Response): Promise<void> {
    try {

      const scenarioRepo = AppDataSource.getRepository(Scenario);
      const personalCaseRepo = AppDataSource.getRepository(PersonalCase);
      const userScenarioRepo = AppDataSource.getRepository(UserScenario);

      const userId = req["currentUser"]?.id;
      const simulationId = req.params.simulationId;
      const scenarioId = req.params.scenarioId;
      const { answer } = req.body;

      if (!answer){
        res.status(400).json({ error: "Answer is required" });
        return;
      }

      const scenario = await scenarioRepo.findOne({
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
      };

      const totalScore =  Number((totalCorrectWord*gradePerWord).toFixed(2));

      const personalCase = await personalCaseRepo.findOne({
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
        await userScenarioRepo.save(userScenarioNew);
      } else {
        // Cari data terbaru berdasarkan created_at atau updated_at
        const latestRecord = await userScenarioRepo.findOne({
          where: {
            user_id: userId,
            scenario_id: Number(scenarioId),
          },
          order: {
            createdAt: "DESC" // atau updated_at tergantung kolom timestamp yang kamu punya
          }
        });

        if (latestRecord) {
          latestRecord.score_similarity = totalScore;
          await userScenarioRepo.save(latestRecord);
        } else {
          // Kalau gak ada data sama sekali, kamu bisa insert baru juga jika perlu
          const userScenarioNew = userScenarioRepo.create({
            user_id: userId,
            scenario_id: Number(scenarioId),
            score_similarity: totalScore
          });
          await userScenarioRepo.save(userScenarioNew);
        }
      };

      res.status(200).json({ data: {
          message: "Success",
          totalScore: totalScore,
      } });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


}