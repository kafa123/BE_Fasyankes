import * as express from "express";
import upload  from "../middleware/upload"
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controller";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/auth.controller";
import { AdminController } from "../controllers/admin.controller";

const Router = express.Router();

Router.get(
  "/user-count-per-day",
  authentification,
  authorization(["admin"]),
  AdminController.getUserCounts
);


export { Router as AdminRouter };