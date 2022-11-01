import { Organization } from "@prisma/client";

import { prisma } from "../../../../../shared/infra/prisma/client";
import { ICreateOrganizationDTO } from "../../../dtos/ICreateOrganizationDTO";
import { IOrganizationRepository } from "../../../repositories/IOrganizationRepository";

class OrganizationRepository implements IOrganizationRepository {
  async create({
    name,
    document,
    help,
    ownerId,
    cityId,
  }: ICreateOrganizationDTO): Promise<void> {
    await prisma.organization.create({
      data: {
        document,
        name,
        help,
        ownerId,
        cityId,
      },
    });
  }

  async findByDocument(document: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        document,
      },
    });

    return organization;
  }
}

export { OrganizationRepository };
