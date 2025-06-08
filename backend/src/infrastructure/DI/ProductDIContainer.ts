import { CreateProduct } from "../../application/use-cases/product/CreateProduct";
import { EditProduct } from "../../application/use-cases/product/EditProduct";
import { ProductDbRepository } from "../repositories/product.db.repository";
import { SubCategoryDbRepository } from "../repositories/subCategory.db.repository";

export class ProductDIContainer {
  static getProductRepository() {
    return new ProductDbRepository();
  }

  static getSubCategoryRepository() {
    return new SubCategoryDbRepository();
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
}
