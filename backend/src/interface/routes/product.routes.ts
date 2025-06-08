import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import productController from "../controllers/product.controller";
import upload from "../../infrastructure/middlewares/upload";

const router = Router();

router.use(isAuthenticated);

router.post("/", upload.any(), productController.createProduct);
router.post("/:id", upload.any(), productController.editProduct);

export default router;
