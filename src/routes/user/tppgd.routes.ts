import * as express from "express";
import { UserTPPGDSimulationController } from "../../controllers/user/tppgd.simulation.controller";

const Router = express.Router();

Router.get("/get-all-simulation", UserTPPGDSimulationController.getAll);

Router.get("/get-simulation/:id", UserTPPGDSimulationController.getOne);

export { Router as UserTPPGDRouter };