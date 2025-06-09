import { Category } from "../../domain/entities/category.entity";
import { ICategoryRepository } from "../../domain/interfaces/category.repository";
import { CategoryModel, ICategory } from "../models/category.model";
import { SubCategoryModel } from "../models/subCategory.model";

export class CategoryDbRepository implements ICategoryRepository {
  async createCategory(category: Category): Promise<void> {
    await CategoryModel.create(category);
  }

  async findCategoryByName(name: string): Promise<Category | null> {
    return await CategoryModel.findOne({ name });
  }

  async getCategoriesWithSubCategories(): Promise<any> {
    const categories = await CategoryModel.find().lean();

    const result = await Promise.all(
      categories.map(async (category) => {
        const subCategories = await SubCategoryModel.find({
          category: category._id,
        }).lean();

        return {
          _id: category._id,
          name: category.name,
          subCategories,
        };
      })
    );
    return result;
  }

  async getAllCategories(): Promise<Category[]> {
    return await CategoryModel.find({});
  }
}
