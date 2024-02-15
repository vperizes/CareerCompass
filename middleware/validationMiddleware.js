import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";
import UserModel from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      //if isEmpty is false then we have an error and need to return msg
      if (!errors.isEmpty()) {
        const errMessages = errors.array().map((error) => error.msg); //getting msg property from error object

        //wonky way to throw 404 vs. 400 if id syntax is correct
        if (errMessages[0].endsWith("not found.")) {
          throw new NotFoundError(errMessages);
        }
        if (errMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError(errMessages);
        }
        throw new BadRequestError(errMessages);
      }
      next();
    },
  ];
};

//invoke withValidationErrors and get back 2 middlewares

export const validateJobInput = withValidationErrors([
  //checks that company and position properties in body are not empty. if it is it sends back the chained message
  body("company").notEmpty().withMessage("company name is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job position is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
  body("applicationDate")
    .notEmpty()
    .withMessage("application date is required"),
  body("applicationNote").optional(),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value); //returns t/f boolean. if F then msg displyed
    if (!isValidId) throw new BadRequestError("invalid MonogoDB id");

    const job = await jobModel.findById(value);
    if (!job) throw new NotFoundError(`Job with id ${value} not found.`);

    //check that user is actual owner of job
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorized to access this route");
    }
  }),
]);

export const validateUserRegistration = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateUserLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUserUpdate = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await UserModel.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
