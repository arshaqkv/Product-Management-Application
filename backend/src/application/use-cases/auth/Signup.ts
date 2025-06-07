import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";
import bcryptjs from "bcryptjs";
import { SignUpDTO } from "../../DTOs/UserDTO";

export class Signup {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: SignUpDTO): Promise<User> {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new CustomError("All fields required", HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new CustomError("Email already is use", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User(name, email, hashedPassword);

    const user = await this.userRepository.createUser(newUser);

    return user;
  }
}
