import { City } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { ILocationRepository } from "../../repositories/ILocationRepository";

@injectable()
class ListCitiesUseCase {
  constructor(
    @inject("LocationRepository")
    private locationRepository: ILocationRepository
  ) {}

  async execute(): Promise<City[]> {
    const cities = await this.locationRepository.listCities();

    return cities;
  }
}

export { ListCitiesUseCase };
