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
exports.AdminSimulationController = void 0;
const data_source_1 = require("../../data-source");
const Simulation_entity_1 = require("../../entity/Simulation.entity");
const User_entity_1 = require("../../entity/User.entity");
const PersonalCase_entity_1 = require("../../entity/PersonalCase.entity");
class AdminSimulationController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                let simulations = yield repo.find({
                    where: { category: req.params.category },
                });
                res.status(200).json({ data: simulations });
                return;
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                const simulation = yield repo.findOneBy({ id: parseInt(req.params.id) });
                if (!simulation) {
                    res.status(404).json({ error: "Simulation not found" });
                    return;
                }
                res.status(200).json({ data: simulation });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { patient_type, case_type, category, perujuk, payment_method, symptoms, case_description, diagnose } = req.body;
                if (!patient_type || !case_type || !category || !payment_method || !case_description || !diagnose) {
                    res.status(400).json({ error: "All fields are required" });
                    return;
                }
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                const userRepo = data_source_1.AppDataSource.getRepository(User_entity_1.User);
                const personalCaseRepo = data_source_1.AppDataSource.getRepository(PersonalCase_entity_1.PersonalCase);
                const simulation = repo.create({
                    patient_type,
                    case_type,
                    payment_method,
                    symptoms,
                    case_description,
                    diagnose,
                    category,
                    perujuk
                });
                yield repo.save(simulation);
                const users = yield userRepo.find({
                    where: { role: "user" }
                });
                const personalCases = users.map((user) => {
                    return personalCaseRepo.create({
                        simulation_id: simulation.id,
                        user_id: user.id,
                        checklist: false,
                        duration: 0
                    });
                });
                yield personalCaseRepo.save(personalCases);
                res.status(201).json({ message: "Simulation and personal cases created successfully", simulation });
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
exports.AdminSimulationController = AdminSimulationController;
//# sourceMappingURL=simulation.controller.js.map