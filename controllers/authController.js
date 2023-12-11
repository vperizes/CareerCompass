import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

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
    throw new UnauthenticatedError("invalid credentials");
  }

  res.send("login");
};
