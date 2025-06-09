import { CreateCategory } from "../../application/use-cases/category/CreateCategory";
import { CreateSubCategory } from "../../application/use-cases/category/CreateSubCategory";
import { GetCategories } from "../../application/use-cases/category/GetCategories";
import { GetCategoriesWithSubCategories } from "../../application/use-cases/category/GetCategoryWithSubCategory";
import { GetSubCategories } from "../../application/use-cases/category/GetSubCategories";
import { CategoryDbRepository } from "../repositories/category.db.repository";
import { SubCategoryDbRepository } from "../repositories/subCategory.db.repository";

export class CategoryDIContainer {
  static getCategoryRepository() {
    return new CategoryDbRepository();
  }

  static getSubCategoryRepository() {
    return new SubCategoryDbRepository();
  }

  static getCreateCategoryUseCase() {
    return new CreateCategory(this.getCategoryRepository());
  }

  static getCreateSubCategoryUseCase() {
    return new CreateSubCategory(this.getSubCategoryRepository());
  }

  static getCategoriesUseCase() {
    return new GetCategories(this.getCategoryRepository());
  }

  static getCategoriesWithSubCategoriesUseCase() {
    return new GetCategoriesWithSubCategories(this.getCategoryRepository());
  }

  static getSubCategoriesUseCase() {
    return new GetSubCategories(this.getSubCategoryRepository());
  }
}
