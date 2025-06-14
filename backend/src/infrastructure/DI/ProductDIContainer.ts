import { CreateProduct } from "../../application/use-cases/product/CreateProduct";
import { EditProduct } from "../../application/use-cases/product/EditProduct";
import { GetAllProducts } from "../../application/use-cases/product/GetAllProducts";
import { GetAProduct } from "../../application/use-cases/product/GetAProduct";
import { ProductDbRepository } from "../repositories/product.db.repository";
import { SubCategoryDbRepository } from "../repositories/subCategory.db.repository";
import { WishlistDbRepository } from "../repositories/wishlist.db.repository";

export class ProductDIContainer {
  static getProductRepository() {
    return new ProductDbRepository();
  }

  static getSubCategoryRepository() {
    return new SubCategoryDbRepository();
  }

  static getWishlistRepository() {
    return new WishlistDbRepository();
  }

  static getCreateProductUseCase() {
    return new CreateProduct(
      this.getProductRepository(),
      this.getSubCategoryRepository()
    );
  }

  static getEditProductUseCase() {
    return new EditProduct(this.getProductRepository());
  }

  static getAProductUseCase() {
    return new GetAProduct(
      this.getProductRepository(),
      this.getWishlistRepository()
    );
  }

  static getAllProductsUseCase() {
    return new GetAllProducts(this.getProductRepository());
  }
}
