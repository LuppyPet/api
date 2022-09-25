import { User } from "@prisma/client";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUserRepository {
  create({ name, email, password, cityId }: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(
    email: string,
    showPassword?: boolean
  ): Promise<Pick<User, "id" | "name" | "email" | "password"> | null>;
}

export { IUserRepository };
