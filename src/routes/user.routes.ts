import * as express from "express";
import upload  from "../middleware/upload"
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";
import { ScenarioUserController } from "../controllers/scenario.controller";

const Router = express.Router();

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

// Router.get("/get-Scenario/:id",ScenarioUserController.getOne)

export { Router as userRouter };