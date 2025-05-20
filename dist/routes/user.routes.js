"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const scenario_controller_1 = require("../controllers/scenario.controller");
const Router = express.Router();
exports.userRouter = Router;
// Router.get(
//   "/users",
//   authentification,
//   authorization(["admin"]),
//   UserController.getUsers
// );
// Router.post("/signup", upload.none(), UserController.signup);
// Router.post("/login", upload.none(), AuthController.login);
// Router.get("/get-all-simulation", SimulationUserController.getAll)
// Router.get("/get-simulation/:id", SimulationUserController.getOne)
// Router.get("/get-All-Scenario/:id", ScenarioUserController.getAll)
Router.get("/get-Scenario/:id", scenario_controller_1.ScenarioUserController.getOne);
//# sourceMappingURL=user.routes.js.map