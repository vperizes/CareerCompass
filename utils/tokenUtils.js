import jwt from "jsonwebtoken";

export const createJWT = (payload, secret, JWT_expiresIn) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: JWT_expiresIn,
  });
  return token;
};

//pass in jwt that we get back from cookie per request
export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
