"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express = require("express");
const upload_1 = require("../middleware/upload");
const auth_controller_1 = require("../controllers/auth.controller");
const authentification_1 = require("../middleware/authentification");
const authorization_1 = require("../middleware/authorization");
const Router = express.Router();
exports.authRouter = Router;
Router.post("/signup", upload_1.default.none(), auth_controller_1.AuthController.signup);
Router.post("/login", upload_1.default.none(), auth_controller_1.AuthController.login);
Router.get("/profile", authentification_1.authentification, (0, authorization_1.authorization)(["admin", "user"]), auth_controller_1.AuthController.getProfile);
Router.put("/profile/update", upload_1.default.none(), authentification_1.authentification, (0, authorization_1.authorization)(["admin", "user"]), auth_controller_1.AuthController.updateProfile);
Router.post("/profile/update-password", upload_1.default.none(), authentification_1.authentification, (0, authorization_1.authorization)(["admin", "user"]), auth_controller_1.AuthController.postNewPassword);
Router.post('/requestPasswordReset', upload_1.default.none());
//# sourceMappingURL=auth.routes.js.map