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
  }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        email,
        name,
        password,
        cityId,
      },
    });
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }
  async findByEmail(
    email: string,
    showPassword = false
  ): Promise<Pick<User, "id" | "name" | "email" | "password"> | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: showPassword,
      },
    });

    return user;
  }
}

export { UserRepository };
