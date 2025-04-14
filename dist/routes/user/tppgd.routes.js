"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTPPGDRouter = void 0;
const express = require("express");
const tppgd_simulation_controller_1 = require("../../controllers/user/tppgd.simulation.controller");
const Router = express.Router();
exports.UserTPPGDRouter = Router;
Router.get("/get-all-simulation", tppgd_simulation_controller_1.UserTPPGDSimulationController.getAll);
Router.get("/get-simulation/:id", tppgd_simulation_controller_1.UserTPPGDSimulationController.getOne);
//# sourceMappingURL=tppgd.routes.js.map