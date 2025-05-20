import * as express from "express";
import { UserTPPRISimulationController } from "../../controllers/user/tppri.simulation.controller";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { ScenarioUserController } from "../../controllers/scenario.controller";

const Router = express.Router();

Router.get(
    "/get-all-simulation", 
    authentification,
    authorization(["user"]),
    UserTPPRISimulationController.getAll);

Router.get("/get-simulation/:id", 
    authentification,
    authorization(["user"]),
    UserTPPRISimulationController.getOne);

Router.get("/get-Scenario/:id",ScenarioUserController.getOne)
Router.get("/get-All-Scenario/:id", ScenarioUserController.getAll)

export { Router as UserTPPRIRouter };