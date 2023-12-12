import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
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