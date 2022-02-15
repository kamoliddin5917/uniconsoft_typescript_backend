import { Router } from "express";
import controller from "./controller";
import middleware from "../../middlewares/auth";

const router = Router();

router
  .get("/admin", middleware.AUTH_ADMIN, controller.GET)

  .post("/register", middleware.AUTH_ADMIN, controller.POST)
  .post("/referenses", middleware.AUTH_ADMIN, controller.ORG_REF_USER)

  .put("/role/:userId", middleware.AUTH_ADMIN, controller.PUT)

  .delete("/admin/:userId", middleware.AUTH_ADMIN, controller.DELETE);

export default router;
