"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTPPRJRouter = void 0;
const express = require("express");
const tpprj_simulation_controller_1 = require("../../controllers/user/tpprj.simulation.controller");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const Router = express.Router();
exports.UserTPPRJRouter = Router;
Router.get("/get-all-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tpprj_simulation_controller_1.UserTPPRJSimulationController.getAll);
Router.get("/get-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tpprj_simulation_controller_1.UserTPPRJSimulationController.getOne);
//# sourceMappingURL=tpprj.routes.js.map