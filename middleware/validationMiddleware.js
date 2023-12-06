import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      //if isEmpty is false then we have an error and need to return msg
      if (!errors.isEmpty()) {
        const errMessages = errors.array().map((error) => error.msg); //getting msg property from error object
        throw new BadRequestError(errMessages);
      }
      next();
    },
  ];
};

//invoke withValidationErrors and get back 2 middlewares
export const validateTest = withValidationErrors([
  //checks that name property in body is not empty. if it is it sends back the chained message
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2 })
    .withMessage("name must have at least 2 characters")
    .trim(),
]);
