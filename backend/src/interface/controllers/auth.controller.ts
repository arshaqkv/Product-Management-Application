import { NextFunction, Request, Response } from "express";
import { AuthDIContainer } from "../../infrastructure/DI/AuthDIContainer";
import { HttpStatus } from "../../utils/http.status";
import { cookieOptions } from "../../utils/cookie.helper";

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

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const login = AuthDIContainer.getLoginUseCase();
      const { token, user } = await login.execute({ email, password });

      res
        .cookie("token", token, cookieOptions)
        .status(HttpStatus.OK)
        .json({ message: "Logged in succussfully", user });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
