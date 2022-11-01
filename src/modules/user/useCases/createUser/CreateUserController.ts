import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      cityId,
      type,
      document,
      organization,
      help,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      cityId,
      type,
      document,
      organization,
      help,
    });

    return response.status(200).send();
  }
}

export { CreateUserController };
