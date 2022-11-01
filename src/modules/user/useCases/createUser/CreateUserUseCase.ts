import { TypeOfAnimals } from "@prisma/client";
import { container, inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateOrganizationUseCase } from "../../../organization/useCases/createOrganization/CreateOrganizationUseCase";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
  cityId: string;
  type: "ong" | "user" | "vet";
  document: string;
  organization: string;
  help: TypeOfAnimals[];
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  async execute({
    name,
    email,
    password,
    cityId,
    type,
    document,
    help,
    organization,
  }: IRequest): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError({
        message: "User already exists",
        code: "not.found",
      });
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const owner = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      cityId,
    });

    if (type === "ong" && owner) {
      const createOrganizationUseCase = container.resolve(
        CreateOrganizationUseCase
      );
      await createOrganizationUseCase.execute({
        cityId,
        document,
        help,
        name: organization,
        ownerId: owner.id,
      });
    }
  }
}

export { CreateUserUseCase };
