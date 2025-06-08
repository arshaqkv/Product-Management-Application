import mongoose from "mongoose";
import { IWhishlistRepository } from "../../domain/interfaces/wishlist.repository";
import { WishlistModel } from "../models/wishlist.model";

export class WishlistDbRepository implements IWhishlistRepository {
  async addProductToWishlist(productId: string, userId: string): Promise<void> {
    await WishlistModel.updateOne(
      { user: userId },
      { $addToSet: { products: productId } },
      { upsert: true, new: true }
    );
  }

  async removeProductFromWishlist(
    productId: string,
    userId: string
  ): Promise<void> {
    await WishlistModel.updateOne(
      { user: userId },
      { $pull: { products: productId } }
    );
  }

  async getWishlist(userId: string): Promise<any> {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const wishlist = await WishlistModel.findOne({
      user: userObjectId,
    }).populate({
      path: "products",
      select: "title variants",
    });

    return wishlist ? wishlist.products : [];
  }
}
