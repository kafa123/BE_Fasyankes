import * as express from "express";
import upload  from "../middleware/upload"
import { SimulationUserController } from "../controllers/simulation.controller";

const Router = express.Router();

Router.get("/get-all-simulation", SimulationUserController.getAll);

Router.get("/get-simulation/:id", SimulationUserController.getOne);

export { Router as userRouter };