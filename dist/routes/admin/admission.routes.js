"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAdmissionRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const admission_controller_1 = require("../../controllers/admin/admission.controller");
const Router = express.Router();
exports.AdminAdmissionRouter = Router;
Router.post("/post-admission", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), admission_controller_1.AdmissionController.create);
Router.get("/get-admission/:simulation_id", admission_controller_1.AdmissionController.getOne);
//# sourceMappingURL=admission.routes.js.map