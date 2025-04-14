"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserRouter = void 0;
const express = require("express");
const authentification_1 = require("../../middleware/authentification");
const authorization_1 = require("../../middleware/authorization");
const user_controller_1 = require("../../controllers/admin/user.controller");
const Router = express.Router();
exports.AdminUserRouter = Router;
Router.get("/users", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), user_controller_1.AdminUserController.getUsers);
Router.get("/user-count-per-day", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), user_controller_1.AdminUserController.getUserCounts);
//# sourceMappingURL=user.routes.js.map