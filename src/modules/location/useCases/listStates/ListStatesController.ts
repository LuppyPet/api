import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListStatesUseCase } from "./ListStatesUseCase";

class ListStatesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listStatesUseCase = container.resolve(ListStatesUseCase);

    const states = await listStatesUseCase.execute();

    return response.json(states);
  }
}

export { ListStatesController };
