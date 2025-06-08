import { IProductRepository } from "../../../domain/interfaces/product.repository";

export class GetAllProducts {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    page: number,
    limit: number,
    search: string,
    subCategory: string
  ): Promise<any> {
    const { products, total } = await this.productRepository.getAllProducts(
      page,
      limit,
      search,
      subCategory
    );

    const totalPages = Math.ceil(total / limit);

    return { products, total, totalPages };
  }
}
