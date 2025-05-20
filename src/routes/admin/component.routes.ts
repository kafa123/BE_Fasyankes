import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { AdmissionController } from "../../controllers/admin/admission.controller";
import upload from "../../middleware/upload";
import { ComponentController } from "../../controllers/admin/component.controller";

const Router = express.Router();


Router.post(
  "/post-component/:type",
  authentification,
  authorization(["admin"]),
  ComponentController.create
)

Router.get(
  "/get-component/:type/:simulation_id",
  authentification,
  authorization(["admin"]),
  ComponentController.getOne
)

Router.put(
  "/update-admission/:simulation_id",
  authentification,
  authorization(["admin"]),
  AdmissionController.update
)
Router.delete(
  "/delete-admission/:simulation_id",
  authentification,
  authorization(["admin"]),
  AdmissionController.delete
)


export { Router as ComponentRouter };