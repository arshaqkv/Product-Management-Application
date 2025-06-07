import { Category } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/interfaces/category.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";

export class CreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(name: string): Promise<void> {
    const existingCategory = await this.categoryRepository.findCategoryByName(
      name
    );

    if (existingCategory) {
      throw new CustomError(
        "Category name already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    const newCategory = new Category(name);

    await this.categoryRepository.createCategory(newCategory);
  }
}
