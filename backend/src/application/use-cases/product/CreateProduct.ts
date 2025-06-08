import { Product } from "../../../domain/entities/product.entity";
import { IProductRepository } from "../../../domain/interfaces/product.repository";
import { ISubCategoryRepository } from "../../../domain/interfaces/subCategory.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { deleteUploadedFiles } from "../../../utils/file.helper";
import { HttpStatus } from "../../../utils/http.status";

export class CreateProduct {
  constructor(
    private productRepository: IProductRepository,
    private subCategoryRepository: ISubCategoryRepository
  ) {}

  async execute(data: Product): Promise<void> {
    const { title, subCategory, description, variants, images } = data;

    if (!title || !subCategory || !description || !variants) {
      deleteUploadedFiles(images);
      throw new CustomError("All fields required", HttpStatus.BAD_REQUEST);
    }

    const existingProduct = await this.productRepository.findProductByName(
      title
    );

    if (existingProduct) {
      throw new CustomError("Product already exists", HttpStatus.BAD_REQUEST);
    }

    const sub_category = await this.subCategoryRepository.findSubCategoryById(
      subCategory
    );

    if (!sub_category) {
      throw new CustomError("Sub-category not found", HttpStatus.NOT_FOUND);
    }

    const newProduct = new Product(
      title,
      subCategory,
      description,
      variants,
      images
    );

    await this.productRepository.createProduct(newProduct);
  }
}
