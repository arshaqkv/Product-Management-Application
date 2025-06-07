import { ICategory } from "../../infrastructure/models/category.model";
import { Category } from "../entities/category.entity";

export interface ICategoryRepository {
  createCategory(category: Category): Promise<void>;
  findCategoryByName(name: string): Promise<Category | null>;
}
