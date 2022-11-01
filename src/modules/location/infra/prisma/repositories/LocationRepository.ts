import { City, State, User } from "@prisma/client";

import { prisma } from "../../../../../shared/infra/prisma/client";
import { ILocationRepository } from "../../../repositories/ILocationRepository";

class LocationRepository implements ILocationRepository {
  async listCities(): Promise<City[]> {
    const cities = await prisma.city.findMany();

    return cities;
  }

  async listStates(): Promise<State[]> {
    const states = await prisma.state.findMany();

    return states;
  }
}

export { LocationRepository };
