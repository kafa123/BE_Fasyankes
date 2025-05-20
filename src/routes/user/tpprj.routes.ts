import * as express from "express";
import { UserTPPRJSimulationController } from "../../controllers/user/tpprj.simulation.controller";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { ScenarioUserController } from "../../controllers/scenario.controller";

const Router = express.Router();

Router.get(
    "/get-all-simulation", 
    authentification,
    authorization(["user"]),
    UserTPPRJSimulationController.getAll);

Router.get("/get-simulation/:id", 
    authentification,
    authorization(["user"]),
    UserTPPRJSimulationController.getOne);

Router.get("/get-Scenario/:id",ScenarioUserController.getOne)
Router.get("/get-All-Scenario/:id", ScenarioUserController.getAll)

export { Router as UserTPPRJRouter };