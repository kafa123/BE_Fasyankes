"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminScenarioRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const scenario_controller_1 = require("../../controllers/admin/scenario.controller");
const upload_1 = require("../../middleware/upload");
const Router = express.Router();
exports.AdminScenarioRouter = Router;
Router.post("/post-scenario", upload_1.default.single("answer_image"), authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), scenario_controller_1.ScenarioController.create);
Router.put("/update-scenario/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), scenario_controller_1.ScenarioController.update);
Router.delete("/delete-scenario/:id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), scenario_controller_1.ScenarioController.delete);
//# sourceMappingURL=scenario.routes.js.map