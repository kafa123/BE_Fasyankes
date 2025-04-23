"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRegistrationRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const registration_controller_1 = require("../../controllers/admin/registration.controller");
const Router = express.Router();
exports.AdminRegistrationRouter = Router;
Router.post("/post-registration", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), registration_controller_1.RegistrationController.create);
Router.get("/get-registration/:id", registration_controller_1.RegistrationController.getOne);
//# sourceMappingURL=registration.routes.js.map