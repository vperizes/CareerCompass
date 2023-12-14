import { Router } from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUserUpdate } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin", authorizePermissions("admin"), getAppStats);
router.patch("/update-user", validateUserUpdate, updateUser);

export default router;
