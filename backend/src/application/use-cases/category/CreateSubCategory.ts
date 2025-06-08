import mongoose from "mongoose";
import { SubCategory } from "../../../domain/entities/subCategory.entity";
import { ISubCategoryRepository } from "../../../domain/interfaces/subCategory.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";

export class CreateSubCategory {
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  async execute(name: string, categoryId: string): Promise<void> {
    const existingSubCategory =
      await this.subCategoryRepository.findSubCategoryByName(name);

    if (existingSubCategory) {
      throw new CustomError(
        "Sub-Category Already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);
    const newSubCategory = new SubCategory(name, categoryObjectId);

    await this.subCategoryRepository.createSubCategory(newSubCategory);
  }
}
