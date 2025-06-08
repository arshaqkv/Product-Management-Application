import { SubCategory } from "../../domain/entities/subCategory.entity";
import { ISubCategoryRepository } from "../../domain/interfaces/subCategory.repository";
import { SubCategoryModel } from "../models/subCategory.model";

export class SubCategoryDbRepository implements ISubCategoryRepository {
  async createSubCategory(subCategory: SubCategory): Promise<void> {
    await SubCategoryModel.create(subCategory);
  }

  async findSubCategoryByName(name: string): Promise<SubCategory | null> {
    return await SubCategoryModel.findOne({ name });
  }
}
