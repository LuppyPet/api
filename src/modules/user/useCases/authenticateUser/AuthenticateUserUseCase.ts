import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      expiresInRefreshToken,
      expiresInToken,
      expiresRefreshTokenDays,
      secretRefreshToken,
      secretToken,
    } = auth;

    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError({
        statusCode: 404,
        message: "User do not exists",
        code: "not.found",
      });
    }

    const user = await this.userRepository.findByEmail(email);

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

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError({
        message: "Email or password incorrect!",
        code: "incorrect.credentials",
      });
    }

    const token = sign({ email: user.email }, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresAt = this.dateProvider.addDays(
      expiresRefreshTokenDays
    );

    await this.userTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresAt: refreshTokenExpiresAt,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
