import { Login } from "../../application/use-cases/auth/Login";
import { Signup } from "../../application/use-cases/auth/Signup";
import { UserDbRepository } from "../repositories/user.db.repository";

export class AuthDIContainer {
  static getUserRepository() {
    return new UserDbRepository();
  }

  static getSignupUseCase() {
    return new Signup(this.getUserRepository());
  }

  static getLoginUseCase() {
    return new Login(this.getUserRepository());
  }
}
