import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { AdminTPPGDSimulationController } from "../../controllers/admin/tppgd.simulation.controller";

const Router = express.Router();

Router.post(
  "/post-simulation",
  authentification,
  authorization(["admin"]),
  AdminTPPGDSimulationController.create
)

Router.put(
  "/update-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminTPPGDSimulationController.update
)

Router.delete(
  "/delete-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminTPPGDSimulationController.delete
)


export { Router as AdminTPPGDRouter };