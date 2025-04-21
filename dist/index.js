"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const express = require("express");
const dotenv = require("dotenv");
const user_routes_1 = require("./routes/user.routes");
require("reflect-metadata");
const errorHandler_1 = require("./middleware/errorHandler");
const admin_routes_1 = require("./routes/admin.routes");
const cors = require("cors");
const path = require("path");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler_1.errorHandler);
const { PORT = 3000 } = process.env;
// endpoint
app.use("/auth", user_routes_1.userRouter);
app.use("/admin", admin_routes_1.AdminRouter);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
app.get("*", (req, res) => {
    res.status(505).json({ message: "Bad Request" });
});
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // app.listen(PORT, () => {
    //   console.log("Server is running on http://localhost:" + PORT);
    // });
    // console.log("Data Source has been initialized!");
    app.listen(Number(PORT), "0.0.0.0", () => {
        console.log(`✅ Server is running at:`);
        console.log(`- Local:    http://localhost:${PORT}`);
    });
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map