import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

//fake data to test routes
let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello there");
});

//get all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

//get single job
app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => {
    return job.id === id;
  });
  if (!job) {
    return res.status(404).json({ msg: `job with id ${id} not found` });
  }
  res.status(200).json({ job });
});

//create job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  const newJob = { id, company, position };

  jobs.push(newJob);
  res.status(201).json({ newJob });
});

//edit job
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(404).json({ msg: "please provide company and position" });
  }

  const { id } = req.params;
  const job = jobs.find((job) => {
    return job.id === id;
  });

  if (!job) {
    return res.status(404).json({ msg: `Job with id ${id} not found.` });
  }

  job.company = company;
  job.position = position;
  res.status(200).json({ msg: `Job with id of ${id} has been updated.`, job });
});

//delete job
app.delete("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => {
    return job.id === id;
  });

  //check if job with the given id exists. if not return 404
  if (!job) {
    return res.status(404).json({
      msg: `Job with id: ${id} not found. Please provide a valid id.`,
    });
  }

  //return array of jobs that do not match with specified id
  const newJobs = jobs.filter((job) => {
    return job.id !== id;
  });
  jobs = newJobs;
  res.status(200).json({ msg: "job deleted" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
