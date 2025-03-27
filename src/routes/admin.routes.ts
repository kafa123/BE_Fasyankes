import * as express from "express";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
import { AdminController } from "../controllers/admin.controller";

const Router = express.Router();

Router.get(
  "/user-count-per-day",
  authentification,
  authorization(["admin"]),
  AdminController.getUserCounts
);

Router.post(
  "/post-simulation",
  authentification,
  authorization(["admin"]),

)


export { Router as AdminRouter };