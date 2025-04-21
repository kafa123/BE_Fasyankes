import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { AdminSimulationController } from "../../controllers/admin/simulation.controller";

const Router = express.Router();

Router.get(
  "/get-all-simulation/:category",
  authentification,
  authorization(["admin"]),
  AdminSimulationController.get
)

Router.post(
  "/post-simulation",
  authentification,
  authorization(["admin"]),
  AdminSimulationController.create
)

Router.put(
  "/update-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminSimulationController.update
)

Router.delete(
  "/delete-simulation/:id",
  authentification,
  authorization(["admin"]),
  AdminSimulationController.delete
)


export { Router as AdminSimulationRouter };