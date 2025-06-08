import { Product } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/interfaces/product.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";

export class GetAProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new CustomError("Product not found", HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
