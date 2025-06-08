import { Product } from "../entities/product.entity";

export interface IProductRepository {
  createProduct(data: Product): Promise<void>;
  findProductByName(title: string): Promise<Product | null>;
  findProductById(id: string): Promise<Product | null>;
  editProduct(id: string, data: Partial<Product>): Promise<void>;
  findDuplicate(id: string, title?: string): Promise<boolean>;
  getAllProducts(
    page: number,
    limit: number,
    search: string,
    subCategory: string
  ): Promise<{ products: Product[]; total: number }>;
}
