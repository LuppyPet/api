import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/user/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/user/useCases/refreshToken/RefreshTokenController";

const sessionsRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

sessionsRoutes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle
);

sessionsRoutes.post("/refresh-token", refreshTokenController.handle);

export { sessionsRoutes };
