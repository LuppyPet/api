import { User } from "@prisma/client";

import { prisma } from "../../../../../shared/infra/prisma/client";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../../repositories/IUserRepository";

class UserRepository implements IUserRepository {
  async create({
    name,
    email,
    password,
    cityId,
  }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        cityId,
      },
    });

    return user;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }
  async findByEmail(
    email: string
  ): Promise<Pick<User, "id" | "name" | "email"> | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { UserRepository };
