import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  cityId: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({ name, email, password, cityId }: IRequest): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError({
        message: "User already exists",
        code: "not.found",
      });
    }
    const passwordHash = await this.hashProvider.generateHash(password);

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      cityId,
    });
  }
}

export { CreateUserUseCase };
