//importing mongoDB model
import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

////CONTROLLERS
//Get all jobs
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  const queryObj = {
    createdBy: req.user.userId,
  };

  //only add position and company to query obj if search exists
  //using mongodb aggregation and regular expression search capabilities
  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObj.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObj.jobType = jobType;
  }

  const sortOptions = {
    newest: "-applicationDate",
    oldest: "applicationDate",
    "a-z": "position",
    "z-a": "-position",
  };

  //pagination set up
  const page = Number(req.query.page) || 1; //query parameters are string. Need numbers() to do math operation for pagination
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortKey = sortOptions[sort] || sortOptions.newest;

  const jobs = await jobModel
    .find(queryObj)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await jobModel.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
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

//stats
export const showStats = async (req, res) => {
  let stats = await jobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, //matching stage - get jobs assoc with user
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } }, //grouping stage - group jobs by job type
  ]);

  //reduce stats array to object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  //placeholder data
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    offer: stats.offer || 0,
  };

  let monthlyApplications = await jobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$applicationDate" },
          month: { $month: "$applicationDate" },
        }, //grouping data by year and month -> sum jobs
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, //get the latest month first - sets us up to view latest data
    { $limit: 6 }, //only show last 6 months
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse(); //reversing to we show months in chronologicl order

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
