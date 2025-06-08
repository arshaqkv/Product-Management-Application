import { IWhishlistRepository } from "../../../domain/interfaces/wishlist.repository";

export class RemoveFromWishlist {
  constructor(private wishlistRepository: IWhishlistRepository) {}

  async execute(userId: string, productId: string): Promise<void> {
    await this.wishlistRepository.removeProductFromWishlist(productId, userId);
  }
}
