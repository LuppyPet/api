import { Router } from "express";

import { sessionsRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/", sessionsRoutes);
router.use("/user", userRoutes);

export { router };
