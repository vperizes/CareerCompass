import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("invalid authentication");
  }

  try {
    const { userId, role } = verifyJWT(token);
    //creating new object property on req body
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid authentication");
  }
};

export const authorizePermissions = (...roles) => {
  //since authorizePermissions is being invoked immediately in user router need to return req, res, next to avoid errors
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("unauthorized to access this route");
    }
    next();
  };
};
