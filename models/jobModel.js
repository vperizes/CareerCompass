import mongoose, { Schema } from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

//schema for new job
const JobSchema = new Schema(
  {
    company: String,
    position: String,
    jobLocation: {
      type: String,
      default: "remote",
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.response_pending,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.full_time,
    },
    createdBy: {
      type: mongoose.Types.ObjectId, //points to mongo id
      ref: "User",
    },
    applicationDate: {
      type: Date,
    },
    applicationNote: String,
  },
  { timestamps: true }
);

//create and export job model/collection
export default mongoose.model("Job", JobSchema);
