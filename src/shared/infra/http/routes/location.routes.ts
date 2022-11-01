import { Router } from "express";

import { ListCitiesController } from "../../../../modules/location/useCases/listCities/ListCitiesController";
import { ListStatesController } from "../../../../modules/location/useCases/listStates/ListStatesController";

const locationRoutes = Router();

const listCitiesController = new ListCitiesController();
const listStatesController = new ListStatesController();

locationRoutes.get("/cities", listCitiesController.handle);
locationRoutes.get("/states", listStatesController.handle);

export { locationRoutes };
