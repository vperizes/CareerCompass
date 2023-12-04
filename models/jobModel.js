import mongoose, { Schema } from "mongoose";

//schema for new job
const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      default: "remote",
    },
    jobStatus: {
      type: String,
      enum: ["Response pending", "Interview", "Declined", "Offer pending"],
      default: "Response pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "intership"],
      default: "full-time",
    },
  },
  { timestamps: true }
);

//create and export job model/collection
export default mongoose.model("Job", JobSchema);
