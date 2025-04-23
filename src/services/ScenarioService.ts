// service/ScenarioService.ts
import { AppDataSource } from "../data-source";
import { Scenario } from "../entity/Scenario.entity";
import { Patient } from "../entity/Patient.entity";
import { PatientDetail } from "../entity/PatientDetail.entity";
import { PatientVisitData } from "../entity/PatientVisitData.entity";

interface CreateScenarioInput {
  scenario: string;
  simulation_id: number;
  question: string;
  component: string;
  patientData?: Partial<Patient>;
  patientDetailData?: Partial<PatientDetail>;
  patientVisitData?: Partial<PatientVisitData>;
}

export class ScenarioService {
  static async createScenario(input: CreateScenarioInput): Promise<Scenario> {
    const {
      scenario,
      simulation_id,
      question,
      component,
      patientData,
      patientDetailData,
      patientVisitData,
    } = input;

    const scenarioRepo = AppDataSource.getRepository(Scenario);
    const patientRepo = AppDataSource.getRepository(Patient);
    const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
    const patientVisitRepo = AppDataSource.getRepository(PatientVisitData);

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newScenario = scenarioRepo.create({
        simulation_id,
        scenario,
        question,
        component,
      });
      await queryRunner.manager.save(newScenario);

      if (component === "pendaftaran") {
        if (!patientData || !patientDetailData) {
          throw new Error("patientData and patientDetailData are required for 'pendaftaran'");
        }

        const patient = patientRepo.create({ ...patientData, simulation_id });
        await queryRunner.manager.save(patient);

        const detail = patientDetailRepo.create({
          ...patientDetailData,
          patient_id: patient.id,
        });
        await queryRunner.manager.save(detail);
      }

      if (component === "data kunjungan") {
        if (!patientVisitData) {
          throw new Error("patientVisitData is required for 'data kunjungan'");
        }

        const visit = patientVisitRepo.create(patientVisitData);
        await queryRunner.manager.save(visit);
      }

      await queryRunner.commitTransaction();
      return newScenario;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
