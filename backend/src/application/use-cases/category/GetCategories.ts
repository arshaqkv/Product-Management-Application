import { ICategoryRepository } from "../../../domain/interfaces/category.repository";

export class GetCategories {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(): Promise<any> {
    const categories =
      await this.categoryRepository.getCategoriesWithSubCategories();

    return categories;
  }
}
