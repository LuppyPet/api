import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCurrentUserUseCase } from "./GetCurrentUserUseCase";

class GetCurrentUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getCurrentUserUseCase = container.resolve(GetCurrentUserUseCase);

    const userId = request.user.id;

    const user = await getCurrentUserUseCase.execute(userId);

    return response.json(user);
  }
}

export { GetCurrentUserController };
