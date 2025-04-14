import * as express from "express";
import { UserTPPGDSimulationController } from "../../controllers/user/tppgd.simulation.controller";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";

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


export { Router as UserTPPGDRouter };