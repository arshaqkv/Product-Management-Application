import { IWhishlistRepository } from "../../../domain/interfaces/wishlist.repository";

export class AddToWishlist {
  constructor(private wishlistRepository: IWhishlistRepository) {}

  async execute(userId: string, productId: string): Promise<void> {
    await this.wishlistRepository.addProductToWishlist(productId, userId);
  }
}
