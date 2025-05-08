"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResultRoutes = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const result_controller_1 = require("../../controllers/user/result.controller");
const Router = express.Router();
exports.UserResultRoutes = Router;
Router.get("/get-result", authentification_1.authentification, (0, authorization_1.authorization)(["user"]), result_controller_1.UserResultController.getResult);
//# sourceMappingURL=result.routes.js.map