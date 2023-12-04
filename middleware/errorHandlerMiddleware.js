import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; //calls status code PROPERTY from customErrors.js and set it to specified code if it exists
  const msg = err.message || "something went wrong";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
