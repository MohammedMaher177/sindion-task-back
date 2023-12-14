import connectionDb from "../DB/dbConnection.js";
import authRouter from "./modules/auth/auth.routes.js";
import taskRouter from "./modules/task/task.routes.js";
import { AppError } from "./util/Error/AppError.js";

export const bootstrap = (app) => {
  connectionDb();
  app.get("/api/v1/", (req, res) => {
    res.json("hello");
  });

  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/task", taskRouter);
  
  app.all("*", (req, res, next) => {
    next(new AppError("Page Not Found", 404));
  });

  app.use((err, req, res, next) => {
    const error = err.message;
    const code = err.statusCode || 500;
    process.env.MODE == "PRODUCTION"
      ? res.status(code).json({ message: "Error", error })
      : res.status(code).json({ message: "Error", error, stack: err.stack });
  });
};
