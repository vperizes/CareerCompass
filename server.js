//package imports
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;

import cookieParser from "cookie-parser";

//router imports
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";

//middleware imports
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

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

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello there");
});

///creating starting url for controllers/routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

//not found middleware - handles requests for non-existent routes
app.use("*", (req, res) => {
  res.status(404).json({ msg: "requested resource not found" });
});

//error middleware - catch-all for handling unexpected errors that occur during request processing
//express-async package handles async errors and passes them to this middleware without needing try-catch block
app.use(errorHandlerMiddleware);
