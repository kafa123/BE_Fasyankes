"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResultRoutes = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const result_controller_1 = require("../../controllers/user/result.controller");
const upload_1 = require("../../middleware/upload");
const Router = express.Router();
exports.UserResultRoutes = Router;
Router.get("/get-result", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), result_controller_1.UserResultController.getResult);
Router.post("/get-score-similarity/:simulationId/:scenarioId", upload_1.default.none(), authentification_1.authentification, (0, authorization_1.authorization)(["user"]), result_controller_1.UserResultController.postSimilarity);
Router.get("/get-result-simulations", upload_1.default.none(), authentification_1.authentification, (0, authorization_1.authorization)(["user"]), result_controller_1.UserResultController.getSimulationResult);
//# sourceMappingURL=result.routes.js.map