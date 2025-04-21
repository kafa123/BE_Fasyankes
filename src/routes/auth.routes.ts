import * as express from "express";
import upload  from "../middleware/upload"
import { AuthController } from "../controllers/auth.controller";

const Router = express.Router();

Router.post("/signup", upload.none(), AuthController.signup);

Router.post("/login", upload.none(), AuthController.login);

export { Router as authRouter };