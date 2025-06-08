import { SubCategory } from "../entities/subCategory.entity";

export interface ISubCategoryRepository {
  createSubCategory(subCategory: SubCategory): Promise<void>;
  findSubCategoryByName(name: string): Promise<SubCategory | null>;
  findSubCategoryById(id: string): Promise<SubCategory | null>;
}
