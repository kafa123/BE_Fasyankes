import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { ScenarioController } from "../../controllers/admin/scenario.controller";
import upload from "../../middleware/upload";

const Router = express.Router();


Router.post(
  "/post-scenario",
  upload.single("answer_image"),
  authentification,
  authorization(["admin"]),
  ScenarioController.create
)

Router.put(
  "/update-scenario/:id",
  authentification,
  authorization(["admin"]),
  ScenarioController.update
)
Router.delete(
  "/delete-scenario/:id",
  authentification,
  authorization(["admin"]),
  ScenarioController.delete
)


export { Router as AdminScenarioRouter };