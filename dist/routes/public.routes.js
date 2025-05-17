"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRouter = void 0;
const express = require("express");
const tppgd_simulation_controller_1 = require("../controllers/user/tppgd.simulation.controller");
const upload_1 = require("../middleware/upload");
const tppri_simulation_controller_1 = require("../controllers/user/tppri.simulation.controller");
const tpprj_simulation_controller_1 = require("../controllers/user/tpprj.simulation.controller");
const Router = express.Router();
exports.PublicRouter = Router;
Router.get("/get-tppgd-simulations", upload_1.default.none(), tppgd_simulation_controller_1.UserTPPGDSimulationController.getAll);
Router.get("/get-tppri-simulations", upload_1.default.none(), tppri_simulation_controller_1.UserTPPRISimulationController.getAll);
Router.get("/get-tpprj-simulations", upload_1.default.none(), tpprj_simulation_controller_1.UserTPPRJSimulationController.getAll);
//# sourceMappingURL=public.routes.js.map