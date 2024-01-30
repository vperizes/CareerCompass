//package imports
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { makeRequest } from "./utils/avoidSpinDown.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

import cookieParser from "cookie-parser";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//router imports
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//middleware imports
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

//cloudinary API
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/jobifyDB";

//connect to mongo database
try {
  await mongoose.connect(DATABASE_URI);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

//path to public folder, temp storage for avatar uploads
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

///creating starting url for controllers/routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//not found middleware - handles requests for non-existent routes
app.use("*", (req, res) => {
  res.status(404).json({ msg: "requested resource not found" });
});

//error middleware - catch-all for handling unexpected errors that occur during request processing
//express-async package handles async errors and passes them to this middleware without needing try-catch block
app.use(errorHandlerMiddleware);

// Call request function every 14.5 minutes to avid server spin down
if (process.env.NODE_ENV !== "development") {
  setInterval(makeRequest, 1000 * 62 * 14);
}
