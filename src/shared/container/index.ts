import { container } from "tsyringe";

import { LocationRepository } from "../../modules/location/infra/prisma/repositories/LocationRepository";
import { ILocationRepository } from "../../modules/location/repositories/ILocationRepository";
import { OrganizationRepository } from "../../modules/organization/infra/prisma/repositories/OrganizationRepository";
import { IOrganizationRepository } from "../../modules/organization/repositories/IOrganizationRepository";
import { UserRepository } from "../../modules/user/infra/prisma/repositories/UserRepository";
import { UserTokensRepository } from "../../modules/user/infra/prisma/repositories/UserTokenRepository";
import { BCryptHashProvider } from "../../modules/user/providers/HashProvider/implementations/BCryptHashProvider";
import { IHashProvider } from "../../modules/user/providers/HashProvider/models/IHashProvider";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository";
// eslint-disable-next-line import-helpers/order-imports
import { IUserTokensRepository } from "../../modules/user/repositories/IUserTokensRepository";

import "./providers";
import { IDateProvider } from "./providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "./providers/DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);

container.registerSingleton<IOrganizationRepository>(
  "OrganizationRepository",
  OrganizationRepository
);

container.registerSingleton<ILocationRepository>(
  "LocationRepository",
  LocationRepository
);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
