import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateOrganizationUseCase } from "./CreateOrganizationUseCase";

class CreateOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cityId, document, help } = request.body;

    const createOrganizationUseCase = container.resolve(
      CreateOrganizationUseCase
    );

    await createOrganizationUseCase.execute({
      name,
      cityId,
      document,
      help,
    });

    return response.status(200).send();
  }
}

export { CreateOrganizationController };
