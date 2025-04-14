"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const simulation_controller_1 = require("../controllers/simulation.controller");
const Router = express.Router();
exports.userRouter = Router;
Router.get("/get-all-simulation", simulation_controller_1.SimulationUserController.getAll);
Router.get("/get-simulation/:id", simulation_controller_1.SimulationUserController.getOne);
//# sourceMappingURL=user.routes.js.map