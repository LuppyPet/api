import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;

    const userId = sub;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) {
      throw new AppError({
        message: "Refresh Token does not exists!",
        code: "not.found",
        statusCode: 401,
      });
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError({
        code: "not.found",
        message: "User not found",
      });
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: sub,
      expiresIn: auth.expiresInRefreshToken,
    });

    const expiresAt = this.dateProvider.addDays(auth.expiresRefreshTokenDays);

    await this.userTokensRepository.create({
      expiresAt,
      refreshToken,
      userId,
    });

    const newToken = sign({ email: user.email }, auth.secretToken, {
      subject: userId,
      expiresIn: auth.expiresInToken,
    });

    return {
      refreshToken,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
