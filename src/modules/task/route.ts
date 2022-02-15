import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router
  .post("/task", middleware.AUTH_LEADER, controller.POST)

  .put("/task/:taskId", middleware.AUTH_LEADER, controller.PUT)

  .delete("/task/:taskId", middleware.AUTH_LEADER, controller.DELETE);

export default router;
