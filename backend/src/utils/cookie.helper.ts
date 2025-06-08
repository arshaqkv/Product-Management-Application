import { config } from "../config/config";

interface ICookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "lax" | "strict" | "none";
  maxAge: number;
}

export const cookieOptions: ICookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === "production",
  sameSite: config.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 1 * 60 * 60 * 1000,
};
