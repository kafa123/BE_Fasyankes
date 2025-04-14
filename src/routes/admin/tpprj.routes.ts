import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { AdminTPPRJSimulationController } from "../../controllers/admin/tpprj.simulation.controller";

const Router = express.Router();

Router.get(
  "/get-all-simulation",
  authentification,
  authorization(["admin"]),
  AdminTPPRJSimulationController.get
)

Router.post(
  "/post-simulation",
  authentification,
  authorization(["admin"]),
  AdminTPPRJSimulationController.create
)

Router.put(
  "/update-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminTPPRJSimulationController.update
)

Router.delete(
  "/delete-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminTPPRJSimulationController.delete
)


export { Router as AdminTPPRJRouter };