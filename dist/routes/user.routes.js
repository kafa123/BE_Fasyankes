"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = require("express");
const upload_1 = require("../middleware/upload");
const authentification_1 = require("../middleware/authentification");
const user_controller_1 = require("../controllers/user.controller");
const authorization_1 = require("../middleware/authorization");
const auth_controller_1 = require("../controllers/auth.controller");
const Router = express.Router();
exports.userRouter = Router;
Router.get("/users", authentification_1.authentification, (0, authorization_1.authorization)(["admin"]), user_controller_1.UserController.getUsers);
Router.post("/signup", upload_1.default.none(), user_controller_1.UserController.signup);
Router.post("/login", upload_1.default.none(), auth_controller_1.AuthController.login);
//# sourceMappingURL=user.routes.js.map