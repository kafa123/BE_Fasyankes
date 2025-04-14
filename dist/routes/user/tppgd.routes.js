"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTPPGDRouter = void 0;
const express = require("express");
const tppgd_simulation_controller_1 = require("../../controllers/user/tppgd.simulation.controller");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const Router = express.Router();
exports.UserTPPGDRouter = Router;
Router.get("/get-all-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tppgd_simulation_controller_1.UserTPPGDSimulationController.getAll);
Router.get("/get-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tppgd_simulation_controller_1.UserTPPGDSimulationController.getOne);
//# sourceMappingURL=tppgd.routes.js.map