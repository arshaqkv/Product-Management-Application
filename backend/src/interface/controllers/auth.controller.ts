import { NextFunction, Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/DI/AuthDIContainer";
import { HttpStatus } from "../../utils/http.status";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    try {
      const signup = AuthDIContainer.getSignupUseCase();
      const user = await signup.execute({ name, email, password });
      res.status(HttpStatus.CREATED).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
