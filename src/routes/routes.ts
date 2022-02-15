import { Router } from "express";

const router = Router();

import login from "../modules/login/route";
import admin from "../modules/admin/route";
import leader from "../modules/leader/route";
import worker from "../modules/worker/route";
import organization from "../modules/organization/route";
import project from "../modules/project/route";
import task from "../modules/task/route";

router.use("/auth", login);
router.use("/api", admin);
router.use("/api", leader);
router.use("/api", worker);
router.use("/api", organization);
router.use("/api", project);
router.use("/api", task);

export default router;
