import UserModel from "../models/UserModel.js";
import jobModel from "../models/jobModel.js";

import { StatusCodes } from "http-status-codes";

export const getCurrentUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

//for admin route to check num users and jobs
export const getAppStats = async (req, res) => {
  const users = await UserModel.countDocuments();
  const jobs = await jobModel.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  //password value not being added to update controller
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
