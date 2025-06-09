import { Product } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/interfaces/product.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";
import fs from "fs";
import path from "path";

export class EditProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    id: string,
    data: Partial<Product>,
    existingImages: string
  ): Promise<void> {
    const { title, images } = data;
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new CustomError("Product not found", HttpStatus.NOT_FOUND);
    }

    const isDuplicateProduct = await this.productRepository.findDuplicate(
      id,
      title
    );

    if (isDuplicateProduct) {
      throw new CustomError(
        "Another product with this name already exists",
        HttpStatus.BAD_REQUEST
      );
    }
 
    if (images && images.length !== 0) {
      product.images.map((image) => {
        const filePath = path.join("src/uploads", image);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }
    if (images?.length === 0) {
      data.images = JSON.parse(existingImages);
    }

    await this.productRepository.editProduct(id, data);
  }
}
