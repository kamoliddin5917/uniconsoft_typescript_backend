import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router
  .post("/project", middleware.AUTH_LEADER, controller.POST)

  .put("/project/:projectId", middleware.AUTH_LEADER, controller.PUT)

  .delete("/project/:projectId", middleware.AUTH_LEADER, controller.DELETE);

export default router;
