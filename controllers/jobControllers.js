//importing mongoDB model
import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import dayjs from "dayjs";

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
// need to set up month increments as query params to display
export const showStats = async (req, res) => {
  let { sortStats } = req.query;

  const status_pipeline = [
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $project: {
        year: {
          $year: "$applicationDate",
        },
        month: {
          $month: "$applicationDate",
        },
        jobStatus: 1,
      },
    },
    {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
          jobStatus: "$jobStatus",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: {
          year: "$_id.year",
          month: "$_id.month",
        },
        statusCounts: {
          $push: {
            status: "$_id.jobStatus",
            count: "$count",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        statusCounts: 1,
      },
    },
    {
      $sort: {
        year: -1,
        month: -1,
      },
    },
  ];

  if (sortStats && sortStats !== "all") {
    sortStats = parseInt(sortStats);
    status_pipeline.push({ $limit: sortStats });
    if (isNaN(sortStats) || sortStats <= 0) {
      // Check if it's not a valid integer or negative
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid sortStats parameter" });
    }
  }

  const status = await jobModel.aggregate(status_pipeline);

  //reduce status array to object with job status counts given $limit
  const totalCounts = status.reduce((acc, item) => {
    item.statusCounts.forEach(({ status, count }) => {
      acc[status] = (acc[status] || 0) + count;
    });
    return acc;
  }, {});

  const defaultStats = {
    pending: totalCounts.pending || 0,
    interview: totalCounts.interview || 0,
    declined: totalCounts.declined || 0,
    offer: totalCounts.offer || 0,
  };

  //put monthly stats pipeline in array so we can conditionally push $limit stage
  let monthlyStats_pipeline;
  let latestMonth_pipeline;
  let monthlyApplications;

  monthlyStats_pipeline = [
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
  ];

  // Add $limit stage conditionally
  if (sortStats && sortStats !== "all") {
    monthlyStats_pipeline.push({ $limit: sortStats });
  }

  monthlyApplications = await jobModel.aggregate(monthlyStats_pipeline);

  const latest_year = monthlyApplications[0]._id.year;
  const latest_month = monthlyApplications[0]._id.month;

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      // using dayjs to format year and month for each item
      const date = dayjs()
        .month(month - 1) //dayjs counts months starting at zero so need to -1
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse(); //reversing so we show months in chronologicl order

  if (sortStats === 1) {
    latestMonth_pipeline = [
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $project: {
          year: {
            $year: "$applicationDate",
          },
          month: {
            $month: "$applicationDate",
          },
          day: {
            $dayOfMonth: "$applicationDate",
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            month: "$month",
            day: "$day",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
          "_id.day": -1,
        },
      },
      {
        $match: {
          "_id.month": latest_month,
          "_id.year": latest_year,
        },
      },
    ];
    monthlyApplications = await jobModel.aggregate(latestMonth_pipeline);
    console.log(monthlyApplications);

    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month, day },
          count,
        } = item;

        // using dayjs to format year and month for each item
        const date = dayjs()
          .date(day)
          .month(month - 1) //dayjs counts months starting at zero so need to -1
          .year(year)
          .format("MMM D, YY");
        return { date, count };
      })
      .reverse();
  }
  monthlyApplications;

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
