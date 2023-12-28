import { Router } from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUserUpdate } from "../middleware/validationMiddleware.js";
import {
  authorizePermissions,
  checkForDemoUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin", authorizePermissions("admin"), getAppStats);
router.patch(
  "/update-user",
  checkForDemoUser,
  upload.single("avatar"),
  validateUserUpdate,
  updateUser
);

export default router;
