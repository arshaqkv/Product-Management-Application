import { Category } from "../../domain/entities/category.entity";
import { ICategoryRepository } from "../../domain/interfaces/category.repository";
import { CategoryModel, ICategory } from "../models/category.model";

export class CategoryDbRepository implements ICategoryRepository {
  async createCategory(category: Category): Promise<void> {
    await CategoryModel.create(category);
  }

  async findCategoryByName(name: string): Promise<Category | null> {
    return await CategoryModel.findOne({ name });
  }
}
