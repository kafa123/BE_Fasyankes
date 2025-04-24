import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { RegistrationController } from "../../controllers/admin/registration.controller";
import upload from "../../middleware/upload";

const Router = express.Router();


Router.post(
  "/post-registration",
  authentification,
  authorization(["admin"]),
  RegistrationController.create
)

Router.get(
  "/get-registration/:id",
  RegistrationController.getOne
)

Router.put(
  "/update-registration/:id",
  authentification,
  authorization(["admin"]),
  RegistrationController.update
)
Router.delete(
  "/delete-registration/:id",
  authentification,
  authorization(["admin"]),
  RegistrationController.delete
)


export { Router as AdminRegistrationRouter };