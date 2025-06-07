import jwt from "jsonwebtoken";
import { config } from "./config";

const ACCESS_TOKEN_SECRET = config.JWT_SECRET;

export const generateToken = (payload: { id?: string }): string => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
};
