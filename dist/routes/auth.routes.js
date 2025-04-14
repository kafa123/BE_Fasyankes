"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express = require("express");
const upload_1 = require("../middleware/upload");
const auth_controller_1 = require("../controllers/auth.controller");
const Router = express.Router();
exports.authRouter = Router;
Router.post("/signup", upload_1.default.none(), auth_controller_1.AuthController.signup);
Router.post("/login", upload_1.default.none(), auth_controller_1.AuthController.login);
//# sourceMappingURL=auth.routes.js.map