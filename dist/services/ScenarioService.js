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
exports.ScenarioService = void 0;
// service/ScenarioService.ts
const data_source_1 = require("../data-source");
const Scenario_entity_1 = require("../entity/Scenario.entity");
const Patient_entity_1 = require("../entity/Patient.entity");
const PatientDetail_entity_1 = require("../entity/PatientDetail.entity");
const PatientVisitData_entity_1 = require("../entity/PatientVisitData.entity");
class ScenarioService {
    static createScenario(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { scenario, simulation_id, question, component, patientData, patientDetailData, patientVisitData, } = input;
            const scenarioRepo = data_source_1.AppDataSource.getRepository(Scenario_entity_1.Scenario);
            const patientRepo = data_source_1.AppDataSource.getRepository(Patient_entity_1.Patient);
            const patientDetailRepo = data_source_1.AppDataSource.getRepository(PatientDetail_entity_1.PatientDetail);
            const patientVisitRepo = data_source_1.AppDataSource.getRepository(PatientVisitData_entity_1.PatientVisitData);
            const queryRunner = data_source_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const newScenario = scenarioRepo.create({
                    simulation_id,
                    scenario,
                    question,
                    component,
                });
                yield queryRunner.manager.save(newScenario);
                if (component === "pendaftaran") {
                    if (!patientData || !patientDetailData) {
                        throw new Error("patientData and patientDetailData are required for 'pendaftaran'");
                    }
                    const patient = patientRepo.create(Object.assign(Object.assign({}, patientData), { simulation_id }));
                    yield queryRunner.manager.save(patient);
                    const detail = patientDetailRepo.create(Object.assign(Object.assign({}, patientDetailData), { patient_id: patient.id }));
                    yield queryRunner.manager.save(detail);
                }
                if (component === "data kunjungan") {
                    if (!patientVisitData) {
                        throw new Error("patientVisitData is required for 'data kunjungan'");
                    }
                    const visit = patientVisitRepo.create(patientVisitData);
                    yield queryRunner.manager.save(visit);
                }
                yield queryRunner.commitTransaction();
                return newScenario;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw error;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.ScenarioService = ScenarioService;
//# sourceMappingURL=ScenarioService.js.map