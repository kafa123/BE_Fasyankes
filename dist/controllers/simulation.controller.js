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
exports.SimulationUserController = void 0;
const data_source_1 = require("../data-source");
const Simulation_entity_1 = require("../entity/Simulation.entity");
class SimulationUserController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Error fetching simulations");
                const repo = data_source_1.AppDataSource.getRepository(Simulation_entity_1.Simulation);
                const simulations = yield repo.find();
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
                if (!simulation)
                    res.status(404).json({ error: "Simulation not found" });
                res.status(200).json({ data: simulation });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.SimulationUserController = SimulationUserController;
//# sourceMappingURL=simulation.controller.js.map