"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const admission_controller_1 = require("../../controllers/admin/admission.controller");
const component_controller_1 = require("../../controllers/admin/component.controller");
const Router = express.Router();
exports.ComponentRouter = Router;
Router.post("/post-component/:type", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), component_controller_1.ComponentController.create);
Router.get("/get-component/:type/:simulation_id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), component_controller_1.ComponentController.getOne);
Router.put("/update-admission/:simulation_id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), admission_controller_1.AdmissionController.update);
Router.delete("/delete-admission/:simulation_id", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), admission_controller_1.AdmissionController.delete);
//# sourceMappingURL=component.routes.js.map