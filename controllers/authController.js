import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const isFirstAccount = (await UserModel.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const newUser = await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = createJWT(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN
  );

  //one day in ms
  const oneDay = 1000 * 60 * 60 * 24;

  //cookie set up
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production", //will return t if in production
  });
  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const forgotPassword = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    throw new NotFoundError("Email does not exist.");
  }

  const secret = process.env.JWT_SECRET + user.password;

  const token = createJWT(
    { email: user.email, userId: user._id },
    secret,
    process.env.JWT_RESETPASS_EXPIRES_IN
  );

  const link = `http://localhost:5173/reset-password/${user._id}/${token}`;
  console.log(link);
  res
    .status(StatusCodes.OK)
    .json({ msg: "valid user. reset password", userId: user._id, token });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmNewPassword } = req.body;
  console.log(newPassword);

  const user = await UserModel.findById(id);

  const secret = process.env.JWT_SECRET + user.password;
  //if verify is true and password match then encrypt new pass and update user
  const verify = jwt.verify(token, secret);
  const isResetValid = verify && newPassword === confirmNewPassword;
  if (!isResetValid) {
    throw new BadRequestError("Password could not be updated");
  }
  const newHashedPassword = await hashPassword(newPassword);
  await UserModel.updateOne(
    { _id: id },
    { $set: { password: newHashedPassword } }
  );

  res.status(StatusCodes.OK).json({ msg: "password updated", user });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
