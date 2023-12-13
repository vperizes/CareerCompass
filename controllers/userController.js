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
  res.status(StatusCodes.OK).json({ msg: "app stats" });
};

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
