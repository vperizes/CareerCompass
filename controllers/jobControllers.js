//importing mongoDB model
import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

////CONTROLLERS
//Get all jobs
export const getAllJobs = async (req, res) => {
  const jobs = await jobModel.find({ createdBy: req.user.userId }); //only getting job assoc with loged in user
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
  req.body.createdBy = req.user.userId;
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

export const showStats = async (req, res) => {
  let stats = await jobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);

  //placeholder data
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    offer: stats.offer || 0,
  };
  const monthlyApplications = [
    {
      date: "Oct 23",
      count: 12,
    },
    {
      date: "Nov 23",
      count: 9,
    },
    {
      date: "Dec 23",
      count: 4,
    },
  ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
