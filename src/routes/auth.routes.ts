import * as express from "express";
import upload  from "../middleware/upload"
import { AuthController } from "../controllers/auth.controller";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.post("/signup", upload.none(), AuthController.signup);

Router.post("/login", upload.none(), AuthController.login);

Router.get("/profile", authentification, authorization(["admin", "user"]), AuthController.getProfile);

Router.put("/profile/update", upload.none(), authentification, authorization(["admin", "user"]), AuthController.updateProfile);

Router.post("/profile/update-password", upload.none(), authentification, authorization(["admin", "user"]), AuthController.postNewPassword);

export { Router as authRouter };