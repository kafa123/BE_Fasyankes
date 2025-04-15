import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { AdminTPPRISimulationController } from "../../controllers/admin/tppri.simulation.controller";

const Router = express.Router();

Router.get(
  "/get-all-simulation",
  authentification,
  authorization(["admin"]),
  AdminTPPRISimulationController.get
)

Router.post(
  "/post-simulation",
  authentification,
  authorization(["admin"]),
  AdminTPPRISimulationController.create
)

Router.put(
  "/update-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminTPPRISimulationController.update
)

Router.delete(
  "/delete-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminTPPRISimulationController.delete
)


export { Router as AdminTPPRIRouter };