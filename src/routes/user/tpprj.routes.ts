import * as express from "express";
import { UserTPPRJSimulationController } from "../../controllers/user/tpprj.simulation.controller";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";

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

export { Router as UserTPPRJRouter };