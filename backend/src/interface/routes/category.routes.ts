import { Router } from "express";
import categoryController from "../controllers/category.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", isAuthenticated, categoryController.createCategory);
router.post("/sub-category", isAuthenticated, categoryController.createSubCategory)

export default router;
