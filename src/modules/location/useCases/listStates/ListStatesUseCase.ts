import { State } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { ILocationRepository } from "../../repositories/ILocationRepository";

@injectable()
class ListStatesUseCase {
  constructor(
    @inject("LocationRepository")
    private locationRepository: ILocationRepository
  ) {}

  async execute(): Promise<State[]> {
    const states = await this.locationRepository.listStates();

    return states;
  }
}

export { ListStatesUseCase };
