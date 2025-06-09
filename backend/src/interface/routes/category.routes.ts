import { Router } from "express";
import categoryController from "../controllers/category.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use(isAuthenticated);

router.post("/", categoryController.createCategory);
router.post("/sub-category", categoryController.createSubCategory);
router.get("/", categoryController.getCategories);
router.get("/sub-category", categoryController.getSubCategories);
router.get("/all-sub-category", categoryController.getCategorieswithSubCategories);

export default router;
