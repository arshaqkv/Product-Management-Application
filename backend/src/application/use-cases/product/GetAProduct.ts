import { Product } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/interfaces/product.repository";
import { IWhishlistRepository } from "../../../domain/interfaces/wishlist.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";

export class GetAProduct {
  constructor(
    private productRepository: IProductRepository,
    private wishlistRepository: IWhishlistRepository
  ) {}

  async execute(
    id: string,
    userId: string
  ): Promise<{ product: Product; isWishlisted: boolean }> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new CustomError("Product not found", HttpStatus.NOT_FOUND);
    }

    let isWishlisted = await this.wishlistRepository.getWishlistProductById(
      id,
      userId
    );

    return { product, isWishlisted };
  }
}
