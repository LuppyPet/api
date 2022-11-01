import { Router } from "express";

import { locationRoutes } from "./location.routes";
import { sessionsRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/", sessionsRoutes);
router.use("/user", userRoutes);
router.use("/location", locationRoutes);

export { router };
