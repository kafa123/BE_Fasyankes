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
require("reflect-metadata");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/admin/user.routes");
const tpprj_routes_1 = require("./routes/user/tpprj.routes");
const tppgd_routes_1 = require("./routes/user/tppgd.routes");
const tppri_routes_1 = require("./routes/user/tppri.routes");
const simulation_routes_1 = require("./routes/admin/simulation.routes");
const cors = require("cors");
const path = require("path");
const scenario_routes_1 = require("./routes/admin/scenario.routes");
const registration_routes_1 = require("./routes/admin/registration.routes");
const admission_routes_1 = require("./routes/admin/admission.routes");
const component_routes_1 = require("./routes/admin/component.routes");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler_1.errorHandler);
const { PORT = 3000 } = process.env;
// endpoint
app.use("/auth", auth_routes_1.authRouter);
app.use("/admin/user/", user_routes_1.AdminUserRouter);
app.use("/tpprj/", tpprj_routes_1.UserTPPRJRouter);
app.use("/tppgd/", tppgd_routes_1.UserTPPGDRouter);

// Admin
app.use("/admin/simulation", simulation_routes_1.AdminSimulationRouter);
app.use("/admin/scenario", scenario_routes_1.AdminScenarioRouter);
app.use("/admin/registration", registration_routes_1.AdminRegistrationRouter);
app.use("/admin/admission", admission_routes_1.AdminAdmissionRouter);
app.use("/admin/component", component_routes_1.ComponentRouter);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.use("/admin/simulation", simulation_routes_1.AdminSimulationRouter);
app.use("/tppri/", tppri_routes_1.UserTPPRIRouter);

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