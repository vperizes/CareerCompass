import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  editJob,
  deleteJob,
} from "../controllers/jobControllers.js";

const router = Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(editJob).delete(deleteJob);

export default router;
