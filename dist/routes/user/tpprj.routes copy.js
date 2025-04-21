"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTPPRJRouter = void 0;
const express = require("express");
const tpprj_simulation_controller_1 = require("../../controllers/user/tpprj.simulation.controller");
const Router = express.Router();
exports.UserTPPRJRouter = Router;
Router.get("/get-all-simulation", tpprj_simulation_controller_1.UserTPPRJSimulationController.getAll);
Router.get("/get-simulation/:id", tpprj_simulation_controller_1.UserTPPRJSimulationController.getOne);
//# sourceMappingURL=tpprj.routes%20copy.js.map