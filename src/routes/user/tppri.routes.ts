import * as express from "express";
import { UserTPPRISimulationController } from "../../controllers/user/tppri.simulation.controller";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";

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


export { Router as UserTPPRIRouter };