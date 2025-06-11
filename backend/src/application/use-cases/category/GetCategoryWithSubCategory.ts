import { ICategoryRepository } from "../../../domain/interfaces/category.repository";

export class GetCategoriesWithSubCategories {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<any> {
    const categories =
      await this.categoryRepository.getCategoriesWithSubCategories();
    return categories;
  }
}
