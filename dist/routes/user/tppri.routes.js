"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTPPRIRouter = void 0;
const express = require("express");
const tppri_simulation_controller_1 = require("../../controllers/user/tppri.simulation.controller");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const Router = express.Router();
exports.UserTPPRIRouter = Router;
Router.get("/get-all-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tppri_simulation_controller_1.UserTPPRISimulationController.getAll);
Router.get("/get-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), tppri_simulation_controller_1.UserTPPRISimulationController.getOne);
//# sourceMappingURL=tppri.routes.js.map