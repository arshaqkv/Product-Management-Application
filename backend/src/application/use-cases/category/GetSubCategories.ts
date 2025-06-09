import { ISubCategoryRepository } from "../../../domain/interfaces/subCategory.repository";

export class GetSubCategories {
  constructor(private subCategoryRepository: ISubCategoryRepository) {}

  async execute(): Promise<any> {
    const subCategories =
      await this.subCategoryRepository.getAllSubCategories();

    return subCategories;
  }
}
