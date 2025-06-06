import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error.middleware";
import { HttpStatus } from "../../utils/http.status";
import { verifyToken } from "../../config/verify.token";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      throw new CustomError("Unauthorized - invalid token", HttpStatus.UNAUTHORIZED);
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};