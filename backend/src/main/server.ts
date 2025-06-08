import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/db";
import { errorHandler } from "../interface/middlewares/error.middleware";

import authRoutes from "../interface/routes/auth.routes";
import categoryRoutes from "../interface/routes/category.routes";
import productRoutes from "../interface/routes/product.routes";

const app: Application = express();
const PORT = config.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

//setup cors
app.use(
  cors({
    origin: config.CORS.CLIENT_URL,
    allowedHeaders: config.CORS.ALLOWED_HEADERS,
    methods: config.CORS.ALLOWED_METHODS,
    credentials: config.CORS.CREDENTIALS,
  })
);

//test api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is working" });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

//error handling middleware
app.use(errorHandler);

//listen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  //connect to Database
  connectDB();
});
