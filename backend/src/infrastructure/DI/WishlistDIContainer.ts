import { AddToWishlist } from "../../application/use-cases/product/AddToWishlist";
import { GetWishlist } from "../../application/use-cases/product/GetWishlist";
import { RemoveFromWishlist } from "../../application/use-cases/product/RemoveFromWishlist";
import { WishlistDbRepository } from "../repositories/wishlist.db.repository";

export class WishlistDIContainer {
  static getWishlistRepository() {
    return new WishlistDbRepository();
  }

  static getAddToWishlistUseCase() {
    return new AddToWishlist(this.getWishlistRepository());
  }

  static getRemoveFromWishlistUseCase() {
    return new RemoveFromWishlist(this.getWishlistRepository());
  }

  static getWishlistUseCase() {
    return new GetWishlist(this.getWishlistRepository());
  }
}
