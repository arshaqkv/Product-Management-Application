import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user.repository";
import { UserModel } from "../models/user.model";

export class UserDbRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }

  async findUserById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
}
