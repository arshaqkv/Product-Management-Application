import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/db";
import { errorHandler } from "../interface/middlewares/error.middleware";

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

//error handling middleware
app.use(errorHandler)

//listen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  //connect to Database
  connectDB()
});
