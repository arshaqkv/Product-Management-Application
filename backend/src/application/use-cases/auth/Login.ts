import { generateToken } from "../../../config/generate.token";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";
import { LoginDTO, LoginResponseDTO } from "../../DTOs/UserDTO";
import bcryptjs from "bcryptjs";

export class Login {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;

    if (!email || !password) {
      throw new CustomError("All fields required", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new CustomError("Invalid Credentials", HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Invalid Credentials", HttpStatus.BAD_REQUEST);
    }

    const token = generateToken({ id: user._id });

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
