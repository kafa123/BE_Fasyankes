import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { AdminUserController } from "../../controllers/admin/user.controller";

const Router = express.Router();

Router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  AdminUserController.getUsers
);

Router.get(
  "/user-count-per-day",
  authentification,
  authorization(["admin"]),
  AdminUserController.getUserCounts
);

export { Router as AdminUserRouter };