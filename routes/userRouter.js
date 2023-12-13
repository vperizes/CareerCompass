import { Router } from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin", getAppStats);
router.patch("/update-user", updateUser);

export default router;
