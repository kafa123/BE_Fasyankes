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


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);
const { PORT = 3000 } = process.env;

// endpoint
app.use("/auth", userRouter);
app.use("/admin", AdminRouter);

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