import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/db";
import { errorHandler } from "../interface/middlewares/error.middleware";

import authRoutes from "../interface/routes/auth.routes";
import categoryRoutes from "../interface/routes/category.routes";

const app: Application = express();
const PORT = config.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//test api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is working" });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);

//error handling middleware
app.use(errorHandler);

//listen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  //connect to Database
  connectDB();
});
