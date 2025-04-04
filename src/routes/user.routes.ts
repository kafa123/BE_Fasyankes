import * as express from "express";
import upload  from "../middleware/upload"
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controller";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";
import { SimulationUserController } from "../controllers/simulation.controller";

const Router = express.Router();

Router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  UserController.getUsers
);

Router.post("/signup", upload.none(), UserController.signup);

Router.post("/login", upload.none(), AuthController.login);

Router.get("/get-all-simulation", SimulationUserController.getAll)

Router.get("/get-simulation/:id", SimulationUserController.getOne)

export { Router as userRouter };