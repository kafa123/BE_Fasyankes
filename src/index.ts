import { AppDataSource } from "./data-source"
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import { AdminRouter } from "./routes/admin.routes";
import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT = 3000 } = process.env;

// endpoint
app.use("/auth", authRouter);
app.use("/admin", AdminRouter);
app.use(userRouter);

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