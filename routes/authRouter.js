import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateUserRegistration, register);
router.post("/login", validateUserLogin, login);
router.get("/logout", logout);

export default router;
