"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSimulationRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const simulation_controller_1 = require("../../controllers/admin/simulation.controller");
const Router = express.Router();
exports.AdminSimulationRouter = Router;
Router.get("/get-all-simulation/:category", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), simulation_controller_1.AdminSimulationController.get);
Router.get("/get-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), simulation_controller_1.AdminSimulationController.getOne);
Router.post("/post-simulation", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), simulation_controller_1.AdminSimulationController.create);
Router.put("/update-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), simulation_controller_1.AdminSimulationController.update);
Router.delete("/delete-simulation/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), simulation_controller_1.AdminSimulationController.delete);
//# sourceMappingURL=simulation.routes.js.map