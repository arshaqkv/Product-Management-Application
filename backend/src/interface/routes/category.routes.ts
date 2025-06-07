import { Router } from "express";
import categoryController from "../controllers/category.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", isAuthenticated, categoryController.createCategory);

export default router;
