import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { AdmissionController } from "../../controllers/admin/admission.controller";
import upload from "../../middleware/upload";

const Router = express.Router();


Router.post(
  "/post-admission",
  authentification,
  authorization(["admin"]),
  AdmissionController.create
)

Router.get(
  "/get-admission/:simulation_id",
  AdmissionController.getOne
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


export { Router as AdminAdmissionRouter };