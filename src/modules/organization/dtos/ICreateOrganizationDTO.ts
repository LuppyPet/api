import { TypeOfAnimals } from "@prisma/client";

interface ICreateOrganizationDTO {
  name: string;
  help: TypeOfAnimals[];
  document: string;
  ownerId: string;
  cityId: string;
}

export { ICreateOrganizationDTO };
