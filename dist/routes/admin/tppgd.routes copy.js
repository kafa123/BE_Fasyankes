"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTPPGDRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const tppgd_simulation_controller_1 = require("../../controllers/admin/tppgd.simulation.controller");
const Router = express.Router();
exports.AdminTPPGDRouter = Router;
Router.get("/get-all-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppgd_simulation_controller_1.AdminTPPGDSimulationController.get);
Router.post("/post-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppgd_simulation_controller_1.AdminTPPGDSimulationController.create);
Router.put("/update-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppgd_simulation_controller_1.AdminTPPGDSimulationController.update);
Router.delete("/delete-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), tppgd_simulation_controller_1.AdminTPPGDSimulationController.delete);
//# sourceMappingURL=tppgd.routes%20copy.js.map