"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentification = void 0;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authentification = (req, res, next) => {
    console.log("Masuk sini kok");
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = header.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    req["currentUser"] = decode;
    next();
};
exports.authentification = authentification;
//# sourceMappingURL=authentification.js.map