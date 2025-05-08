import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { UserResultController } from "../../controllers/user/result.controller";

const Router = express.Router();

Router.get(
    "/get-result", 
    authentification,
    authorization(["user"]),
    UserResultController.getResult);

export { Router as UserResultRoutes };