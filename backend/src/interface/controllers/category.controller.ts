import { NextFunction, Request, Response } from "express";
import { CategoryDIContainer } from "../../infrastructure/DI/CategoryDIContainer";
import { HttpStatus } from "../../utils/http.status";

class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    try {
      await CategoryDIContainer.getCreateCategoryUseCase().execute(name);
      res.status(HttpStatus.CREATED).json({ message: "New category created" });
    } catch (error) {
      next(error);
    }
  }
}

const categoryController = new CategoryController();
export default categoryController;
