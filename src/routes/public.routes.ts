import * as express from "express";
import { UserTPPGDSimulationController } from "../controllers/user/tppgd.simulation.controller";
import upload  from "../middleware/upload"
import { UserTPPRISimulationController } from "../controllers/user/tppri.simulation.controller";
import { UserTPPRJSimulationController } from "../controllers/user/tpprj.simulation.controller";

const Router = express.Router();

Router.get(
    "/get-tppgd-simulations", 
    upload.none(),
    UserTPPGDSimulationController.getAll);

Router.get(
    "/get-tppri-simulations", 
    upload.none(),
    UserTPPRISimulationController.getAll);

Router.get(
    "/get-tpprj-simulations", 
    upload.none(),
    UserTPPRJSimulationController.getAll);

export { Router as PublicRouter };