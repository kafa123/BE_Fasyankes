import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { PersonalCase } from "../../entity/PersonalCase.entity";
import { Simulation } from "../../entity/Simulation.entity";

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


}