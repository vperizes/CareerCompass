//importing mongoDB model
import jobModel from "../models/jobModel.js";

import { StatusCodes } from "http-status-codes";
////CONTROLLERS
//Get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await jobModel.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

//Get single job
export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await jobModel.findById(id);

  res.status(StatusCodes.CREATED).json({ job });
};

//Create job
export const createJob = async (req, res) => {
  const newJob = await jobModel.create(req.body); //creating a new document (job entry) in Job collection
  res.status(201).json({ newJob });
};

//Update job
export const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await jobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    msg: `Job with id of ${id} has been updated.`,
    updatedJob: updatedJob,
  });
};

//Delete Job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await jobModel.findByIdAndDelete(id);

  res.status(200).json({ msg: "job deleted", removedJob: removedJob });
};
