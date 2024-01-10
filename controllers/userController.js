import UserModel from "../models/UserModel.js";
import jobModel from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/multerMiddleware.js";

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
  const newUserInfo = { ...req.body };
  delete newUserInfo.password; //password value omitted from update controller

  //update image only if user is sending image
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUserInfo.avatar = response.secure_url;
    newUserInfo.avatarPublicId = response.public_id;
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    newUserInfo
  );

  //removes any old image from cloudinary when user uploads new image
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
