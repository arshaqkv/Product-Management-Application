import { CreateCategory } from "../../application/use-cases/category/CreateCategory";
import { CategoryDbRepository } from "../repositories/category.db.repository";

export class CategoryDIContainer {
  static getCategoryRepository() {
    return new CategoryDbRepository();
  }

  static getCreateCategoryUseCase() {
    return new CreateCategory(this.getCategoryRepository());
  }
}
