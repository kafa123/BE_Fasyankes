"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTPPRJRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const tpprj_simulation_controller_1 = require("../../controllers/admin/tpprj.simulation.controller");
const Router = express.Router();
exports.AdminTPPRJRouter = Router;
Router.post("/post-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tpprj_simulation_controller_1.AdminTPPRJSimulationController.create);
Router.put("/update-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tpprj_simulation_controller_1.AdminTPPRJSimulationController.update);
Router.delete("/delete-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tpprj_simulation_controller_1.AdminTPPRJSimulationController.delete);
//# sourceMappingURL=tpprj.routes%20copy.js.map