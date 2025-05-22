import * as express from "express";
import { authentification } from "../../middleware/authentification";
import { authorization } from "../../middleware/authorization";
import { UserResultController } from "../../controllers/user/result.controller";
import upload  from "../../middleware/upload"


const Router = express.Router();


Router.get(
    "/get-result", 
    authentification,
    authorization(["user"]),
    UserResultController.getResult);

Router.post(
    "/get-score-similarity/:simulationId/:scenarioId", 
    upload.none(),
    authentification,
    authorization(["user"]),
    UserResultController.postSimilarity);

Router.get(
    "/get-result-simulations", 
    upload.none(),
    authentification,
    authorization(["user"]),
    UserResultController.getSimulationResult);

export { Router as UserResultRoutes };