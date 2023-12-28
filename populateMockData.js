import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jobModel from "./models/jobModel.js";
import UserModel from "./models/UserModel.js";

dotenv.config();

try {
  await mongoose.connect(process.env.DATABASE_URI);
  const demoUser = await UserModel.findOne({ email: "test@test.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: demoUser._id };
  });
  await jobModel.create(jobs);
  console.log("success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
