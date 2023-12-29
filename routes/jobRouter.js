import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  editJob,
  deleteJob,
  showStats,
} from "../controllers/jobControllers.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForDemoUser } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkForDemoUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkForDemoUser, validateJobInput, validateIdParam, editJob)
  .delete(checkForDemoUser, validateIdParam, deleteJob);

export default router;
