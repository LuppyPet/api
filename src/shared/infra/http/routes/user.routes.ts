import { Router } from "express";

import { CreateUserController } from "../../../../modules/user/useCases/createUser/CreateUserController";
import { GetCurrentUserController } from "../../../../modules/user/useCases/getCurrentUser/GetCurrentUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const getCurrentUserController = new GetCurrentUserController();

userRoutes.post("/", createUserController.handle);

userRoutes.get("/me", ensureAuthenticated, getCurrentUserController.handle);

export { userRoutes };
