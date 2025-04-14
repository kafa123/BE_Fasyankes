import * as express from "express";
import { UserTPPRJSimulationController } from "../../controllers/user/tpprj.simulation.controller";

const Router = express.Router();

Router.get("/get-all-simulation", UserTPPRJSimulationController.getAll);

Router.get("/get-simulation/:id", UserTPPRJSimulationController.getOne);

export { Router as UserTPPRJRouter };