"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.originalname); // or create custom name
    }
});
const upload = multer({ storage });
exports.default = upload;
//# sourceMappingURL=upload.js.map