import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IResponse {
  id: string;
  name: string;
  email: string;
}

@injectable()
class GetCurrentUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(id: string): Promise<IResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError({
        statusCode: 404,
        message: "User do not exists",
        code: "not.found",
      });
    }

    if (user.password === null) {
      const token = uuidV4();

      const expiresAt = this.dateProvider.addHours(3);

      await this.userTokensRepository.create({
        refreshToken: token,
        userId: user.id,
        expiresAt,
      });
    }

    return { id: user.id, name: user.name, email: user.email };
  }
}

export { GetCurrentUserUseCase };
