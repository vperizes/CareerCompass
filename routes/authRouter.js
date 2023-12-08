import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateUserRegistration } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateUserRegistration, register);
router.post("/login", login);

export default router;
