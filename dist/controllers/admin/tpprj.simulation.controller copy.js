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
exports.AdminTPPRJSimulationController = void 0;
const data_source_1 = require("../../data-source");
const Simulation_entity_1 = require("../../entity/Simulation.entity");
class AdminTPPRJSimulationController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patient_type, case_type, payment_method, case_description, diagnose } = req.body;
                if (!patient_type || !case_type || !payment_method || !case_description || !diagnose) {
                    res.status(400).json({ error: "All fields are required" });
                    return;
                }
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                const simulation = repo.create({
                    patient_type,
                    case_type,
                    payment_method,
                    case_description,
                    diagnose,
                    category: "rawat_jalan"
                });
                yield repo.save(simulation);
                res.status(201).json({ message: "Simulation created successfully", simulation });
                return;
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                let simulation = yield repo.findOneBy({ id: parseInt(req.params.id) });
                if (!simulation) {
                    res.status(404).json({ error: "Simulation not found" });
                    return;
                }
                repo.merge(simulation, req.body);
                yield repo.save(simulation);
                res.status(200).json({ message: "Simulation updated successfully", simulation });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                const result = yield repo.delete(req.params.id);
                if (result.affected === 0) {
                    res.status(404).json({ error: "Simulation not found" });
                    return;
                }
                res.status(200).json({ message: "Simulation deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.AdminTPPRJSimulationController = AdminTPPRJSimulationController;
//# sourceMappingURL=tpprj.simulation.controller%20copy.js.map