import * as express from "express";
import upload  from "../middleware/upload"
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controller";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";

const Router = express.Router();

Router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  UserController.getUsers
);

Router.post("/signup", upload.none(), UserController.signup);

Router.post("/login", upload.none(), AuthController.login);

export { Router as userRouter };