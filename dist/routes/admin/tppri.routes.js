"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTPPRIRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const tppri_simulation_controller_1 = require("../../controllers/admin/tppri.simulation.controller");
const Router = express.Router();
exports.AdminTPPRIRouter = Router;
Router.get("/get-all-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppri_simulation_controller_1.AdminTPPRISimulationController.get);
Router.post("/post-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppri_simulation_controller_1.AdminTPPRISimulationController.create);
Router.put("/update-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppri_simulation_controller_1.AdminTPPRISimulationController.update);
Router.delete("/delete-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppri_simulation_controller_1.AdminTPPRISimulationController.delete);
//# sourceMappingURL=tppri.routes.js.map