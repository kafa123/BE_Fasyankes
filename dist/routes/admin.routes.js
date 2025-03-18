"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express = require("express");
const authentification_1 = require("../middleware/authentification");
const authorization_1 = require("../middleware/authorization");
const admin_controller_1 = require("../controllers/admin.controller");
const Router = express.Router();
exports.AdminRouter = Router;
Router.get("/user-count-per-day", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), admin_controller_1.AdminController.getUserCounts);
//# sourceMappingURL=admin.routes.js.map