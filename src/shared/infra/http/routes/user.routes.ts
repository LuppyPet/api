import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { CreateUserController } from "../../../../modules/user/useCases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      cityId: Joi.string().required(),
    },
  }),
  createUserController.handle
);

export { userRoutes };
