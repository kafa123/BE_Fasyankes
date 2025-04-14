import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { AdminController } from "../controllers/admin.controller";
import { SimulationController } from "../controllers/admin/simulation.controller";

const Router = express.Router();

Router.get(
  "/user-count-per-day",
  authentification,
  authorization(["admin"]),
  AdminController.getUserCounts
);

Router.post(
  "/post-simulation",
  authentification,
  authorization(["admin"]),
  SimulationController.create
)

Router.put(
  "/update-simulation/:id",
  authentification,
  authorization(["admin"]),
  SimulationController.update
)

Router.delete(
  "/delete-simulation/:id",
  authentification,
  authorization(["admin"]),
  SimulationController.delete
)






export { Router as AdminRouter };