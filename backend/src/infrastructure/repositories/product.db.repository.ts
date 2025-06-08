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
}
