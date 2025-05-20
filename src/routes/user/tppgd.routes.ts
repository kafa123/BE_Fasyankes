import * as express from "express";
import { UserTPPGDSimulationController } from "../../controllers/user/tppgd.simulation.controller";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { ScenarioUserController } from "../../controllers/scenario.controller";

const Router = express.Router();

Router.get(
    "/get-all-simulation", 
    authentification,
    authorization(["user"]),
    UserTPPGDSimulationController.getAll);

Router.get("/get-simulation/:id", 
    authentification,
    authorization(["user"]),
    UserTPPGDSimulationController.getOne);

Router.get("/get-Scenario/:id",ScenarioUserController.getOne)
Router.get("/get-All-Scenario/:id", ScenarioUserController.getAll)

export { Router as UserTPPGDRouter };