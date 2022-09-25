import { UserToken } from "@prisma/client";

import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUserTokensRepository {
  create({
    expiresAt,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken | null>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refreshToken: string): Promise<UserToken | null>;
}

export { IUserTokensRepository };
