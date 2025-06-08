import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import productController from "../controllers/product.controller";
import upload from "../../infrastructure/middlewares/upload";

const router = Router();

router.use(isAuthenticated);

router.post("/", upload.any(), productController.createProduct);
router.put("/:id", upload.any(), productController.editProduct);

router.get("/wishlist", productController.getWishlist);
router.patch("/wishlist/add", productController.addToWishlist);
router.patch("/wishlist/remove", productController.removeFromWishlist);

router.get("/:id", productController.getProduct);

export default router;
