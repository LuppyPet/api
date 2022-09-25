import { UserToken } from "@prisma/client";

import { prisma } from "../../../../../shared/infra/prisma/client";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";

class UserTokensRepository implements IUserTokensRepository {
  async create({
    expiresAt,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = prisma.userToken.create({
      data: {
        expiresAt,
        refreshToken,
        userId,
      },
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | null> {
    const usersTokens = await prisma.userToken.findFirst({
      where: {
        userId,
        refreshToken,
      },
    });
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userToken.delete({ where: { id } });
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken | null> {
    const userToken = await prisma.userToken.findFirst({
      where: { refreshToken },
    });

    return userToken;
  }
}

export { UserTokensRepository };
