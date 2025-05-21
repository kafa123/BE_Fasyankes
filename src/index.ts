import { AppDataSource } from "./data-source"
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { authRouter } from "./routes/auth.routes";
import { AdminUserRouter } from "./routes/admin/user.routes";
import { UserTPPRJRouter } from "./routes/user/tpprj.routes";
import { UserTPPGDRouter } from "./routes/user/tppgd.routes";
import { UserTPPRIRouter } from "./routes/user/tppri.routes";
import { AdminSimulationRouter } from "./routes/admin/simulation.routes";

import * as cors from "cors";
import * as path from "path";
import { AdminScenarioRouter } from "./routes/admin/scenario.routes";
import { AdminRegistrationRouter } from "./routes/admin/registration.routes";
import { AdminAdmissionRouter } from "./routes/admin/admission.routes";
import { ComponentController } from "./controllers/admin/component.controller";
import { ComponentRouter } from "./routes/admin/component.routes";
import { UserResultRoutes } from "./routes/user/result.routes";
import { PublicRouter } from "./routes/public.routes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  
app.use(errorHandler);
const { PORT = 3000 } = process.env;

// endpoint
app.use("/auth", authRouter);

app.use("/admin/user/", AdminUserRouter);

app.use("/tpprj/", UserTPPRJRouter);

app.use("/tppgd/", UserTPPGDRouter);

app.use("/tppri/", UserTPPRIRouter);

app.use("/", UserResultRoutes);

// Admin

app.use("/admin/simulation", AdminSimulationRouter);

app.use("/admin/scenario", AdminScenarioRouter);

app.use("/admin/registration", AdminRegistrationRouter);

app.use("/admin/admission", AdminAdmissionRouter);

app.use("/admin/component", ComponentRouter)

app.use("/", PublicRouter);


app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});



AppDataSource.initialize()
  .then(async () => {

    // app.listen(PORT, () => {
    //   console.log("Server is running on http://localhost:" + PORT);
    // });
    // console.log("Data Source has been initialized!");

    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`✅ Server is running at:`);
      console.log(`- Local:    http://localhost:${PORT}`);
    })
  })
  .catch((error) => console.log(error));