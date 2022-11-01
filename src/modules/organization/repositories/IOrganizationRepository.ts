import { Organization } from "@prisma/client";

import { ICreateOrganizationDTO } from "../dtos/ICreateOrganizationDTO";

interface IOrganizationRepository {
  create({ name, document, help }: ICreateOrganizationDTO): Promise<void>;
  findByDocument(document: string): Promise<Organization | null>;
}

export { IOrganizationRepository };
