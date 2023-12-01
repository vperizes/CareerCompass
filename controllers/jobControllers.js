import { nanoid } from "nanoid";

//fake data to test routes
let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => {
    return job.id === id;
  });
  if (!job) {
    return res.status(404).json({ msg: `job with id ${id} not found` });
  }
  res.status(200).json({ job });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  const newJob = { id, company, position };

  jobs.push(newJob);
  res.status(201).json({ newJob });
};

export const editJob = async (req, res) => {
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
};

export const deleteJob = async (req, res) => {
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
};
