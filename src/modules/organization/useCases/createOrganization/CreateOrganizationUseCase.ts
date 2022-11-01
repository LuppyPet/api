import { TypeOfAnimals } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IOrganizationRepository } from "../../repositories/IOrganizationRepository";

interface IRequest {
  name: string;
  cityId: string;
  document: string;
  help: TypeOfAnimals[];
  ownerId: string;
}

@injectable()
class CreateOrganizationUseCase {
  constructor(
    @inject("OrganizationRepository")
    private organizationRepository: IOrganizationRepository
  ) {}

  async execute({
    name,
    cityId,
    document,
    help,
    ownerId,
  }: IRequest): Promise<void> {
    const organizationAlreadyExists =
      await this.organizationRepository.findByDocument(document);

    if (organizationAlreadyExists) {
      throw new AppError({
        message: "Organization already exists",
        code: "not.found",
      });
    }

    await this.organizationRepository.create({
      cityId,
      document,
      help,
      name,
      ownerId,
    });
  }
}

export { CreateOrganizationUseCase };
