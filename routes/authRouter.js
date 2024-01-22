import { Router } from "express";
import {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middleware/validationMiddleware.js";
import rateLimit from "express-rate-limit";

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 1000 * 60 * 15, //15 min
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes" },
});

router.post("/register", apiLimiter, validateUserRegistration, register);
router.post("/login", apiLimiter, validateUserLogin, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.get("/logout", logout);

export default router;
