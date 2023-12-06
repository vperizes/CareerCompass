import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  editJob,
  deleteJob,
} from "../controllers/jobControllers.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(getSingleJob)
  .patch(validateJobInput, editJob)
  .delete(deleteJob);

export default router;
