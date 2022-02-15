import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router.get("/leader", middleware.AUTH_LEADER, controller.GET);

export default router;
