///recreate data with applicationNote. remove data for demo user. repopulate demo data

import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/UserModel.js";
import jobModel from "./models/jobModel.js";

dotenv.config();
try {
  await mongoose.connect(process.env.DATABASE_URI);
  const demoUser = await UserModel.findOne({ email: "test@test.com" });
  await jobModel.deleteMany({ createdBy: demoUser._id });
  console.log("success");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
