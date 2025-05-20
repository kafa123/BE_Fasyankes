"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTPPRIRouter = void 0;
const express = require("express");
const tppri_simulation_controller_1 = require("../../controllers/user/tppri.simulation.controller");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const scenario_controller_1 = require("../../controllers/scenario.controller");
const Router = express.Router();
exports.UserTPPRIRouter = Router;
Router.get("/get-all-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tppri_simulation_controller_1.UserTPPRISimulationController.getAll);
Router.get("/get-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tppri_simulation_controller_1.UserTPPRISimulationController.getOne);
Router.get("/get-Scenario/:id", scenario_controller_1.ScenarioUserController.getOne);
Router.get("/get-All-Scenario/:id", scenario_controller_1.ScenarioUserController.getAll);
//# sourceMappingURL=tppri.routes.js.map