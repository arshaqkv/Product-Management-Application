import { NextFunction, Request, Response } from "express";
import { ProductDIContainer } from "../../infrastructure/DI/ProductDIContainer";
import { HttpStatus } from "../../utils/http.status";
import { WishlistDIContainer } from "../../infrastructure/DI/WishlistDIContainer";

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
      const images = files ? files.map((file) => file.filename) : undefined;
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

  async getProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const product = await ProductDIContainer.getAProductUseCase().execute(id);
      res.status(HttpStatus.OK).json(product);
    } catch (error) {
      next(error);
    }
  }

  async addToWishlist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    const { prodId } = req.body;
    try {
      await WishlistDIContainer.getAddToWishlistUseCase().execute(id, prodId);
      res.status(HttpStatus.OK).json({ message: "Product added to wishlist" });
    } catch (error) {
      next(error);
    }
  }

  async removeFromWishlist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    const { prodId } = req.body;
    try {
      await WishlistDIContainer.getRemoveFromWishlistUseCase().execute(
        id,
        prodId
      );
      res
        .status(HttpStatus.OK)
        .json({ message: "Product removed from wishlist" });
    } catch (error) {
      next(error);
    }
  }

  async getWishlist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const wishlist = await WishlistDIContainer.getWishlistUseCase().execute(
        id
      );

      res.status(HttpStatus.OK).json(wishlist);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const search = req.query.search as string;
      const subCategory = req.query.subCategory as string;

      const { products, total, totalPages } =
        await ProductDIContainer.getAllProductsUseCase().execute(
          page,
          limit,
          search,
          subCategory
        );
      res.status(HttpStatus.OK).json({ products, total, totalPages });
    } catch (error) {
      next(error);
    }
  }
}

const productController = new ProductController();
export default productController;
