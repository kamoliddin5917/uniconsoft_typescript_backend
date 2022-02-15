import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router
  .post("/organization", middleware.AUTH_ADMIN, controller.POST)

  .put("/organization/:orgId", middleware.AUTH_ADMIN, controller.PUT)

  .delete("/organization/:orgId", middleware.AUTH_ADMIN, controller.DELETE);

export default router;
