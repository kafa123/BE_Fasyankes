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

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT = 3000 } = process.env;

// endpoint
app.use("/auth", authRouter);
app.use("/admin/user/", AdminUserRouter);

app.use("/tpprj/", UserTPPRJRouter);

app.use("/tppgd/", UserTPPGDRouter);

app.use("/admin/simulation", AdminSimulationRouter);

app.use("/tppri/", UserTPPRIRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));