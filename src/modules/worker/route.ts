import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router
  .get("/worker", middleware.AUTH_WORKER, controller.GET)

  .put("/worker/:taskId", middleware.AUTH_WORKER, controller.PUT);

export default router;
