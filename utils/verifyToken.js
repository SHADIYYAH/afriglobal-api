require("dotenv").config();
const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(403, "You are not authorized!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, checkIfUserExists) => {
    if (error) {
      return next(createError(401, "Authetication failed"));
    }
    req.checkIfUserExists = checkIfUserExists;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.params.id === checkIfUserExists._id) {
      next();
    } else {
      return next(createError(401, "You are not authorized!"));
    }
  });
};

module.exports = { verifyToken, verifyUser };
