import { City, State } from "@prisma/client";

interface ILocationRepository {
  listCities(): Promise<City[]>;
  listStates(): Promise<State[]>;
}

export { ILocationRepository };
