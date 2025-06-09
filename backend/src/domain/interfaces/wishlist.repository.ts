import { IWishlist } from "../../infrastructure/models/wishlist.model";

export interface IWhishlistRepository {
  addProductToWishlist(productId: string, userId: string): Promise<void>;
  removeProductFromWishlist(productId: string, userId: string): Promise<void>;
  getWishlist(userId: string): Promise<any>;
  getWishlistProductById(productId: string, userId: string): Promise<boolean>;
}
