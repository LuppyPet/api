import { container } from "tsyringe";

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

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);
