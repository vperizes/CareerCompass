//package imports
import "express-async-errors";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;

//router imports
import jobRouter from "./routes/jobRouter.js";

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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello there");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ msg: "data recieved", data: req.body });
});

///creating starting url for controllers/routes
app.use("/api/v1/jobs", jobRouter);

//not found middleware - handles requests for non-existent routes
app.use("*", (req, res) => {
  res.status(404).json({ msg: "requested resource not found" });
});

//error middleware - catch-all for handling unexpected errors that occur during request processing
//express-async package handles errors and passes them to this middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});
