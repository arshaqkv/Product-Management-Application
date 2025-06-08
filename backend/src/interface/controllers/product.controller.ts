import { NextFunction, Request, Response } from "express";
import { ProductDIContainer } from "../../infrastructure/DI/ProductDIContainer";
import { HttpStatus } from "../../utils/http.status";

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    const { title, subCategory, description, variants } = req.body;

    try {
      const files = req.files as Express.Multer.File[];
      const images = files?.map((file) => file.filename) ?? [];
      await ProductDIContainer.getCreateProductUseCase().execute({
        title,
        subCategory,
        description,
        images,
        variants,
      });
      res
        .status(HttpStatus.CREATED)
        .json({ message: "Product created succussfully" });
    } catch (error) {
      next(error);
    }
  }

  async editProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const files = req.files as Express.Multer.File[];
      const images = files?.map((file) => file.filename) ?? [];
      await ProductDIContainer.getEditProductUseCase().execute(id, {
        ...req.body,
        images,
      });

      res
        .status(HttpStatus.OK)
        .json({ message: "Product updated succussfully" });
    } catch (error) {
      next(error);
    }
  }
}

const productController = new ProductController();
export default productController;
