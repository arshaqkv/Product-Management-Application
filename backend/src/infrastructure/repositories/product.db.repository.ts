import mongoose from "mongoose";
import { Product } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/interfaces/product.repository";
import { ProductModel } from "../models/product.model";

export class ProductDbRepository implements IProductRepository {
  async createProduct(data: Product): Promise<void> {
    await ProductModel.create(data);
  }

  async findProductById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id);
  }

  async findProductByName(title: string): Promise<Product | null> {
    return await ProductModel.findOne({ title });
  }

  async editProduct(id: string, data: Partial<Product>): Promise<void> {
    await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findDuplicate(id: string, title?: string): Promise<boolean> {
    const existing = await ProductModel.findOne({ title, _id: { $ne: id } });
    return !!existing;
  }

  async getAllProducts(
    page: number,
    limit: number,
    search: string,
    subCategory: string
  ): Promise<{ products: Product[]; total: number }> {
    let query: any = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (subCategory && mongoose.Types.ObjectId.isValid(subCategory)) {
      query.subCategory = new mongoose.Types.ObjectId(subCategory);
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .populate("subCategory", "name")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      ProductModel.countDocuments(query),
    ]);

    return {
      products,
      total,
    };
  }
}
